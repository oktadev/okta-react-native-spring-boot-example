import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import PointActions from './points.reducer'
import { localDateToJsDate } from '../../../shared/util/date-transforms'

export function * getPoint (api, action) {
  const { pointId } = action
  // make the call to the api
  const apiCall = call(api.getPoint, pointId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(PointActions.pointSuccess(response.data))
  } else {
    yield put(PointActions.pointFailure(response.data))
  }
}

export function * getPoints (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getPoints, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(PointActions.pointAllSuccess(response.data))
  } else {
    yield put(PointActions.pointAllFailure(response.data))
  }
}

export function * updatePoint (api, action) {
  const { point } = action
  // make the call to the api
  const idIsNotNull = !!point.id
  const apiCall = call(idIsNotNull ? api.updatePoint : api.createPoint, point)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(PointActions.pointUpdateSuccess(response.data))
  } else {
    yield put(PointActions.pointUpdateFailure(response.data))
  }
}

export function * searchPoints (api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchPoints, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(PointActions.pointSearchSuccess(response.data))
  } else {
    yield put(PointActions.pointSearchFailure(response.data))
  }
}
export function * deletePoint (api, action) {
  const { pointId } = action
  // make the call to the api
  const apiCall = call(api.deletePoint, pointId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(PointActions.pointDeleteSuccess())
  } else {
    yield put(PointActions.pointDeleteFailure(response.data))
  }
}
function mapDateFields (data) {
  if (data.date) {
    data.date = localDateToJsDate(data.date)
  }
  return data
}
