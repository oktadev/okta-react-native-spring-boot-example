import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/PreferenceRedux'

test('attempt retrieving a single preference', () => {
  const state = reducer(INITIAL_STATE, Actions.preferenceRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.preference).toBe(null)
})

test('attempt retrieving a list of preference', () => {
  const state = reducer(INITIAL_STATE, Actions.preferenceAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.preferences).toBe(null)
})

test('attempt updating a preference', () => {
  const state = reducer(INITIAL_STATE, Actions.preferenceUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt searching a preference', () => {
  const state = reducer(INITIAL_STATE, Actions.preferenceSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a preference', () => {
  const state = reducer(INITIAL_STATE, Actions.preferenceDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a preference', () => {
  const state = reducer(INITIAL_STATE, Actions.preferenceSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.preference).toEqual({id: 1})
})

test('success retrieving a list of preference', () => {
  const state = reducer(INITIAL_STATE, Actions.preferenceAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.preferences).toEqual([{id: 1}, {id: 2}])
})

test('success updating a preference', () => {
  const state = reducer(INITIAL_STATE, Actions.preferenceUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.preference).toEqual({id: 1})
})
test('success searching a preference', () => {
  const state = reducer(INITIAL_STATE, Actions.preferenceSearchSuccess({id: 1}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.preferences).toEqual({id: 1})
})
test('success deleting a preference', () => {
  const state = reducer(INITIAL_STATE, Actions.preferenceDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.preference).toEqual(null)
})

test('failure retrieving a preference', () => {
  const state = reducer(INITIAL_STATE, Actions.preferenceFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.preference).toEqual(null)
})

test('failure retrieving a list of preference', () => {
  const state = reducer(INITIAL_STATE, Actions.preferenceAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.preferences).toEqual(null)
})

test('failure updating a preference', () => {
  const state = reducer(INITIAL_STATE, Actions.preferenceUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.preference).toEqual(INITIAL_STATE.preference)
})
test('failure searching a preference', () => {
  const state = reducer(INITIAL_STATE, Actions.preferenceSearchFailure({error: 'Not found'}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({error: 'Not found'})
  expect(state.preferences).toEqual(null)
})
test('failure deleting a preference', () => {
  const state = reducer(INITIAL_STATE, Actions.preferenceDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.preference).toEqual(INITIAL_STATE.preference)
})
