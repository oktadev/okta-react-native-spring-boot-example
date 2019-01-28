import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/blood-pressure/blood-pressure.reducer'

test('attempt retrieving a single bloodPressure', () => {
  const state = reducer(INITIAL_STATE, Actions.bloodPressureRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.bloodPressure).toBe(null)
})

test('attempt retrieving a list of bloodPressure', () => {
  const state = reducer(INITIAL_STATE, Actions.bloodPressureAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.bloodPressures).toBe(null)
})

test('attempt updating a bloodPressure', () => {
  const state = reducer(INITIAL_STATE, Actions.bloodPressureUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt searching a bloodPressure', () => {
  const state = reducer(INITIAL_STATE, Actions.bloodPressureSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a bloodPressure', () => {
  const state = reducer(INITIAL_STATE, Actions.bloodPressureDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a bloodPressure', () => {
  const state = reducer(INITIAL_STATE, Actions.bloodPressureSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.bloodPressure).toEqual({id: 1})
})

test('success retrieving a list of bloodPressure', () => {
  const state = reducer(INITIAL_STATE, Actions.bloodPressureAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.bloodPressures).toEqual([{id: 1}, {id: 2}])
})

test('success updating a bloodPressure', () => {
  const state = reducer(INITIAL_STATE, Actions.bloodPressureUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.bloodPressure).toEqual({id: 1})
})
test('success searching a bloodPressure', () => {
  const state = reducer(INITIAL_STATE, Actions.bloodPressureSearchSuccess({id: 1}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.bloodPressures).toEqual({id: 1})
})
test('success deleting a bloodPressure', () => {
  const state = reducer(INITIAL_STATE, Actions.bloodPressureDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.bloodPressure).toEqual(null)
})

test('failure retrieving a bloodPressure', () => {
  const state = reducer(INITIAL_STATE, Actions.bloodPressureFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.bloodPressure).toEqual(null)
})

test('failure retrieving a list of bloodPressure', () => {
  const state = reducer(INITIAL_STATE, Actions.bloodPressureAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.bloodPressures).toEqual(null)
})

test('failure updating a bloodPressure', () => {
  const state = reducer(INITIAL_STATE, Actions.bloodPressureUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.bloodPressure).toEqual(INITIAL_STATE.bloodPressure)
})
test('failure searching a bloodPressure', () => {
  const state = reducer(INITIAL_STATE, Actions.bloodPressureSearchFailure({error: 'Not found'}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({error: 'Not found'})
  expect(state.bloodPressures).toEqual(null)
})
test('failure deleting a bloodPressure', () => {
  const state = reducer(INITIAL_STATE, Actions.bloodPressureDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.bloodPressure).toEqual(INITIAL_STATE.bloodPressure)
})
