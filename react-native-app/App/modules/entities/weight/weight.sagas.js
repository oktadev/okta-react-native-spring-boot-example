import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import WeightActions from './weight.reducer'

export function * getWeight (api, action) {
  const { weightId } = action
  // make the call to the api
  const apiCall = call(api.getWeight, weightId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(WeightActions.weightSuccess(response.data))
  } else {
    yield put(WeightActions.weightFailure(response.data))
  }
}

export function * getWeights (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getWeights, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(WeightActions.weightAllSuccess(response.data))
  } else {
    yield put(WeightActions.weightAllFailure(response.data))
  }
}

export function * updateWeight (api, action) {
  const { weight } = action
  // make the call to the api
  const idIsNotNull = !!weight.id
  const apiCall = call(idIsNotNull ? api.updateWeight : api.createWeight, weight)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(WeightActions.weightUpdateSuccess(response.data))
  } else {
    yield put(WeightActions.weightUpdateFailure(response.data))
  }
}

export function * searchWeights (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchWeights, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(WeightActions.weightSearchSuccess(response.data))
  } else {
    yield put(WeightActions.weightSearchFailure(response.data))
  }
}
export function * deleteWeight (api, action) {
  const { weightId } = action
  // make the call to the api
  const apiCall = call(api.deleteWeight, weightId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(WeightActions.weightDeleteSuccess())
  } else {
    yield put(WeightActions.weightDeleteFailure(response.data))
  }
}
function mapDateFields (data) {
  if (data.timestamp) {
    data.timestamp = new Date(data.timestamp)
  }
  return data
}
