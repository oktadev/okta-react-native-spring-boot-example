import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import PreferenceActions from './preferences.reducer'

export function * getPreference (api, action) {
  const { preferenceId } = action
  // make the call to the api
  const apiCall = call(api.getPreference, preferenceId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(PreferenceActions.preferenceSuccess(response.data))
  } else {
    yield put(PreferenceActions.preferenceFailure(response.data))
  }
}

export function * getPreferences (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getPreferences, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(PreferenceActions.preferenceAllSuccess(response.data))
  } else {
    yield put(PreferenceActions.preferenceAllFailure(response.data))
  }
}

export function * updatePreference (api, action) {
  const { preference } = action
  // make the call to the api
  const idIsNotNull = !!preference.id
  const apiCall = call(idIsNotNull ? api.updatePreference : api.createPreference, preference)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(PreferenceActions.preferenceUpdateSuccess(response.data))
  } else {
    yield put(PreferenceActions.preferenceUpdateFailure(response.data))
  }
}

export function * searchPreferences (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchPreferences, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(PreferenceActions.preferenceSearchSuccess(response.data))
  } else {
    yield put(PreferenceActions.preferenceSearchFailure(response.data))
  }
}
export function * deletePreference (api, action) {
  const { preferenceId } = action
  // make the call to the api
  const apiCall = call(api.deletePreference, preferenceId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(PreferenceActions.preferenceDeleteSuccess())
  } else {
    yield put(PreferenceActions.preferenceDeleteFailure(response.data))
  }
}
