import FixtureAPI from '../../App/Services/FixtureApi'
import { call, put, select } from 'redux-saga/effects'
import { login, logout, loginLoad, selectAuthToken } from '../../App/Sagas/LoginSagas'
import LoginActions from '../../App/Redux/LoginRedux'
import AccountActions from '../../App/Redux/AccountRedux'
var reference = require('../../App/Lib/GenerateNonce')
reference.generateNonce = function () {
  return 'test-nonce'
}

const stepper = (fn) => (mock) => fn.next(mock).value

test('login success path', () => {
  const oauthInfo = FixtureAPI.getOauthInfo()
  const oauthIssuerInfo = FixtureAPI.getOauthIssuerInfo()
  const step = stepper(login(FixtureAPI, oauthInfo))
  const sampleOauthResponse = {
    'url': 'oidcapp://authorize#state=test-nonce&id_token=test-id-token&access_token=test-access-token&token_type=bearer&session_state=6d5b0148-979a-4ff9-b56d-77af3111f72a&expires_in=900&not-before-policy=0'
  }
  expect(step(oauthInfo)).toEqual(call(FixtureAPI.getOauthInfo))
  expect(step(oauthInfo)).toEqual(call(FixtureAPI.getOauthIssuerInfo, oauthInfo.data.issuer))
  // await the response from the oauth2 issuer
  step(oauthIssuerInfo)
  expect(step(sampleOauthResponse)).toEqual(call(FixtureAPI.setAuthToken, 'test-access-token'))
  expect(step()).toEqual(put(LoginActions.loginSuccess('test-access-token')))
  // Request the account details
  expect(step()).toEqual(put(AccountActions.accountRequest()))
  // Close the relogin popup if needed
  expect(step()).toEqual(put({ type: 'RELOGIN_OK' }))
})
test('login failure from bad nonce path', () => {
  const oauthInfo = FixtureAPI.getOauthInfo()
  const oauthIssuerInfo = FixtureAPI.getOauthIssuerInfo()
  const step = stepper(login(FixtureAPI, oauthInfo))

  expect(step(oauthInfo)).toEqual(call(FixtureAPI.getOauthInfo))
  expect(step(oauthInfo)).toEqual(call(FixtureAPI.getOauthIssuerInfo, oauthInfo.data.issuer))
  const sampleOauthResponse = {
    'url': 'oidcapp://authorize#state=test-wrong-nonce&id_token=test-id-token&access_token=test-access-token&token_type=bearer&session_state=6d5b0148-979a-4ff9-b56d-77af3111f72a&expires_in=900&not-before-policy=0'
  }
  // await the response from the oauth2 issuer
  step(oauthIssuerInfo)
  expect(step(sampleOauthResponse)).toEqual(put(LoginActions.loginFailure('WRONG')))
})
test('login failure path', () => {
  const response = FixtureAPI.getOauthInfo()
  const step = stepper(login(FixtureAPI))

  expect(step(response)).toEqual(call(FixtureAPI.getOauthInfo))

  // set response.ok to false as if the oauth issuer is down
  response.ok = false
  expect(step(response)).toEqual(put(LoginActions.loginFailure('WRONG')))
})
test('login load path with no token', () => {
  const step = stepper(loginLoad(FixtureAPI))
  // Attempt to select the token
  expect(step()).toEqual(select(selectAuthToken))
  // No token was found so call success
  expect(step()).toEqual(put(LoginActions.loginLoadSuccess()))
})
test('login load path with a token', () => {
  const accessToken = 'sample-access-token'
  const step = stepper(loginLoad(FixtureAPI))
  // Select the token from redux and set it
  expect(step(accessToken)).toEqual(select(selectAuthToken))
  expect(step(accessToken)).toEqual(call(FixtureAPI.setAuthToken, accessToken))
  FixtureAPI.setAuthToken(accessToken)
  // The token has been set so call success
  expect(step()).toEqual(put(LoginActions.loginLoadSuccess()))
})
test('logout success path', () => {
  const step = stepper(logout(FixtureAPI))
  expect(step()).toEqual(call(FixtureAPI.removeAuthToken))
  FixtureAPI.removeAuthToken()
  // Reset the account and logout
  expect(step()).toEqual(put(AccountActions.accountRequest()))
  expect(step()).toEqual(put(LoginActions.logoutSuccess()))
  expect(step()).toEqual(put({ type: 'RELOGIN_ABORT' }))
})
test('selects the auth token', () => {
  const state = {login: {authToken: 'hi'}}
  // Retrieve the API token
  expect(selectAuthToken(state)).toEqual('hi')
})
