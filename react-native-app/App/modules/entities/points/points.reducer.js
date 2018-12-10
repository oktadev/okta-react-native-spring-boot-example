import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  pointRequest: ['pointId'],
  pointAllRequest: ['options'],
  pointUpdateRequest: ['point'],
  pointSearchRequest: ['query'],
  pointDeleteRequest: ['pointId'],

  pointSuccess: ['point'],
  pointAllSuccess: ['points'],
  pointUpdateSuccess: ['point'],
  pointSearchSuccess: ['points'],
  pointDeleteSuccess: [],

  pointFailure: ['error'],
  pointAllFailure: ['error'],
  pointUpdateFailure: ['error'],
  pointSearchFailure: ['error'],
  pointDeleteFailure: ['error']
})

export const PointTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  point: null,
  points: null,
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
    point: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    points: null
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
  const { point } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    point
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { points } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    points
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { point } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    point
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { points } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    points
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    point: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    point: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    points: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    point: state.point
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    point: state.point
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    points: null
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POINT_REQUEST]: request,
  [Types.POINT_ALL_REQUEST]: allRequest,
  [Types.POINT_UPDATE_REQUEST]: updateRequest,
  [Types.POINT_SEARCH_REQUEST]: searchRequest,
  [Types.POINT_DELETE_REQUEST]: deleteRequest,

  [Types.POINT_SUCCESS]: success,
  [Types.POINT_ALL_SUCCESS]: allSuccess,
  [Types.POINT_UPDATE_SUCCESS]: updateSuccess,
  [Types.POINT_SEARCH_SUCCESS]: searchSuccess,
  [Types.POINT_DELETE_SUCCESS]: deleteSuccess,

  [Types.POINT_FAILURE]: failure,
  [Types.POINT_ALL_FAILURE]: allFailure,
  [Types.POINT_UPDATE_FAILURE]: updateFailure,
  [Types.POINT_SEARCH_FAILURE]: searchFailure,
  [Types.POINT_DELETE_FAILURE]: deleteFailure
})
