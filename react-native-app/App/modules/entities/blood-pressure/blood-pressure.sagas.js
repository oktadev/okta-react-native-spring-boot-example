import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import BloodPressureActions from './blood-pressure.reducer'

export function * getBloodPressure (api, action) {
  const { bloodPressureId } = action
  // make the call to the api
  const apiCall = call(api.getBloodPressure, bloodPressureId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(BloodPressureActions.bloodPressureSuccess(response.data))
  } else {
    yield put(BloodPressureActions.bloodPressureFailure(response.data))
  }
}

export function * getBloodPressures (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getBloodPressures, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(BloodPressureActions.bloodPressureAllSuccess(response.data))
  } else {
    yield put(BloodPressureActions.bloodPressureAllFailure(response.data))
  }
}

export function * updateBloodPressure (api, action) {
  const { bloodPressure } = action
  // make the call to the api
  const idIsNotNull = !!bloodPressure.id
  const apiCall = call(idIsNotNull ? api.updateBloodPressure : api.createBloodPressure, bloodPressure)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(BloodPressureActions.bloodPressureUpdateSuccess(response.data))
  } else {
    yield put(BloodPressureActions.bloodPressureUpdateFailure(response.data))
  }
}

export function * searchBloodPressures (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchBloodPressures, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(BloodPressureActions.bloodPressureSearchSuccess(response.data))
  } else {
    yield put(BloodPressureActions.bloodPressureSearchFailure(response.data))
  }
}
export function * deleteBloodPressure (api, action) {
  const { bloodPressureId } = action
  // make the call to the api
  const apiCall = call(api.deleteBloodPressure, bloodPressureId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(BloodPressureActions.bloodPressureDeleteSuccess())
  } else {
    yield put(BloodPressureActions.bloodPressureDeleteFailure(response.data))
  }
}
function mapDateFields (data) {
  if (data.timestamp) {
    data.timestamp = new Date(data.timestamp)
  }
  return data
}
