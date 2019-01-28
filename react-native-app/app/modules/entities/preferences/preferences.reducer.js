import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  preferenceRequest: ['preferenceId'],
  preferenceAllRequest: ['options'],
  preferenceUpdateRequest: ['preference'],
  preferenceSearchRequest: ['query'],
  preferenceDeleteRequest: ['preferenceId'],

  preferenceSuccess: ['preference'],
  preferenceAllSuccess: ['preferences'],
  preferenceUpdateSuccess: ['preference'],
  preferenceSearchSuccess: ['preferences'],
  preferenceDeleteSuccess: [],

  preferenceFailure: ['error'],
  preferenceAllFailure: ['error'],
  preferenceUpdateFailure: ['error'],
  preferenceSearchFailure: ['error'],
  preferenceDeleteFailure: ['error']
})

export const PreferenceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  preference: null,
  preferences: null,
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
    preference: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    preferences: null
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
  const { preference } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    preference
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { preferences } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    preferences
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { preference } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    preference
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { preferences } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    preferences
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    preference: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    preference: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    preferences: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    preference: state.preference
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    preference: state.preference
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    preferences: null
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PREFERENCE_REQUEST]: request,
  [Types.PREFERENCE_ALL_REQUEST]: allRequest,
  [Types.PREFERENCE_UPDATE_REQUEST]: updateRequest,
  [Types.PREFERENCE_SEARCH_REQUEST]: searchRequest,
  [Types.PREFERENCE_DELETE_REQUEST]: deleteRequest,

  [Types.PREFERENCE_SUCCESS]: success,
  [Types.PREFERENCE_ALL_SUCCESS]: allSuccess,
  [Types.PREFERENCE_UPDATE_SUCCESS]: updateSuccess,
  [Types.PREFERENCE_SEARCH_SUCCESS]: searchSuccess,
  [Types.PREFERENCE_DELETE_SUCCESS]: deleteSuccess,

  [Types.PREFERENCE_FAILURE]: failure,
  [Types.PREFERENCE_ALL_FAILURE]: allFailure,
  [Types.PREFERENCE_UPDATE_FAILURE]: updateFailure,
  [Types.PREFERENCE_SEARCH_FAILURE]: searchFailure,
  [Types.PREFERENCE_DELETE_FAILURE]: deleteFailure
})
