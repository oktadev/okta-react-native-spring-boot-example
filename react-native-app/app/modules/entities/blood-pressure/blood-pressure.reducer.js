import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  bloodPressureRequest: ['bloodPressureId'],
  bloodPressureAllRequest: ['options'],
  bloodPressureUpdateRequest: ['bloodPressure'],
  bloodPressureSearchRequest: ['query'],
  bloodPressureDeleteRequest: ['bloodPressureId'],

  bloodPressureSuccess: ['bloodPressure'],
  bloodPressureAllSuccess: ['bloodPressures'],
  bloodPressureUpdateSuccess: ['bloodPressure'],
  bloodPressureSearchSuccess: ['bloodPressures'],
  bloodPressureDeleteSuccess: [],

  bloodPressureFailure: ['error'],
  bloodPressureAllFailure: ['error'],
  bloodPressureUpdateFailure: ['error'],
  bloodPressureSearchFailure: ['error'],
  bloodPressureDeleteFailure: ['error']
})

export const BloodPressureTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  bloodPressure: null,
  bloodPressures: null,
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorSearching: null,
  errorDeleting: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    bloodPressure: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    bloodPressures: null
  })

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updating: true
  })
// request to search from an api
export const searchRequest = (state) =>
  state.merge({
    searching: true
  })
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true
  })

// successful api lookup for single entity
export const success = (state, action) => {
  const { bloodPressure } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    bloodPressure
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { bloodPressures } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    bloodPressures
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { bloodPressure } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    bloodPressure
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { bloodPressures } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    bloodPressures
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    bloodPressure: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    bloodPressure: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    bloodPressures: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    bloodPressure: state.bloodPressure
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    bloodPressure: state.bloodPressure
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    bloodPressures: null
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BLOOD_PRESSURE_REQUEST]: request,
  [Types.BLOOD_PRESSURE_ALL_REQUEST]: allRequest,
  [Types.BLOOD_PRESSURE_UPDATE_REQUEST]: updateRequest,
  [Types.BLOOD_PRESSURE_SEARCH_REQUEST]: searchRequest,
  [Types.BLOOD_PRESSURE_DELETE_REQUEST]: deleteRequest,

  [Types.BLOOD_PRESSURE_SUCCESS]: success,
  [Types.BLOOD_PRESSURE_ALL_SUCCESS]: allSuccess,
  [Types.BLOOD_PRESSURE_UPDATE_SUCCESS]: updateSuccess,
  [Types.BLOOD_PRESSURE_SEARCH_SUCCESS]: searchSuccess,
  [Types.BLOOD_PRESSURE_DELETE_SUCCESS]: deleteSuccess,

  [Types.BLOOD_PRESSURE_FAILURE]: failure,
  [Types.BLOOD_PRESSURE_ALL_FAILURE]: allFailure,
  [Types.BLOOD_PRESSURE_UPDATE_FAILURE]: updateFailure,
  [Types.BLOOD_PRESSURE_SEARCH_FAILURE]: searchFailure,
  [Types.BLOOD_PRESSURE_DELETE_FAILURE]: deleteFailure
})
