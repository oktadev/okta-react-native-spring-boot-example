import { call, put, select, take } from 'redux-saga/effects'
import { Linking } from 'react-native'
import { eventChannel } from 'redux-saga'
import LoginActions from '../Redux/LoginRedux'
import AccountActions from '../Redux/AccountRedux'
import AppConfig from '../Config/AppConfig'
import { generateNonce } from '../Lib/GenerateNonce'
import { parseOauthResponse } from '../Transforms/ParseOauthResponse'

export const selectAuthToken = (state) => state.login.authToken
// attempts to login
export function * login (api) {
  // get the oauth issuer information from the backend
  const authInfo = yield call(api.getOauthInfo)
  if (authInfo.ok) {
    const { issuer, clientId, scope } = authInfo.data
    const issuerInfo = yield call(api.getOauthIssuerInfo, issuer)
    const authorizationEndpoint = issuerInfo.data['authorization_endpoint']

    const nonce = generateNonce()
    const url = [
      `${authorizationEndpoint}`,
      `?response_type=${encodeURIComponent(`id_token token`)}`,
      `&client_id=${clientId}`,
      `&scope=${encodeURIComponent(scope)}`,
      `&redirect_uri=${encodeURIComponent(`${AppConfig.appUrlScheme}://authorize`)}`,
      `&nonce=${nonce}`,
      `&state=${nonce}`
    ].join('')
    Linking.openURL(url)

    console.tron.log('Waiting for response from Oauth2 Issuer')
    // the proper way to add a callback in a saga
    const chan = eventChannel(emit => {
      Linking.addEventListener('url', (e) => emit({url: e.url}))
      return () => {}
    })
    const oauthResponse = yield take(chan)
    chan.close()
    Linking.removeEventListener('url')
    // parse the parameters from the redirect URI
    const { oauthState, accessToken } = parseOauthResponse(oauthResponse)

    if (oauthState === nonce) {
      yield call(api.setAuthToken, accessToken)
      yield put(LoginActions.loginSuccess(accessToken))
      yield put(AccountActions.accountRequest())
      yield put({ type: 'RELOGIN_OK' })
    } else {
      console.tron.log('State variable does not match, login failed')
      yield put(LoginActions.loginFailure('WRONG'))
    }
  } else {
    yield put(LoginActions.loginFailure('WRONG'))
  }
}

// attempts to logout
export function * logout (api) {
  yield call(api.removeAuthToken)
  yield put(AccountActions.accountRequest())
  yield put(LoginActions.logoutSuccess())
  yield put({ type: 'RELOGIN_ABORT' })
}
// loads the login
export function * loginLoad (api) {
  const authToken = yield select(selectAuthToken)
  // only set the token if we have it
  if (authToken) {
    yield call(api.setAuthToken, authToken)
  }
  yield put(LoginActions.loginLoadSuccess())
}
