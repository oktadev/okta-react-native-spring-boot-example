import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/points/points.reducer'

test('attempt retrieving a single point', () => {
  const state = reducer(INITIAL_STATE, Actions.pointRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.point).toBe(null)
})

test('attempt retrieving a list of point', () => {
  const state = reducer(INITIAL_STATE, Actions.pointAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.points).toBe(null)
})

test('attempt updating a point', () => {
  const state = reducer(INITIAL_STATE, Actions.pointUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt searching a point', () => {
  const state = reducer(INITIAL_STATE, Actions.pointSearchRequest(1))

  expect(state.searching).toBe(true)
})
test('attempt to deleting a point', () => {
  const state = reducer(INITIAL_STATE, Actions.pointDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a point', () => {
  const state = reducer(INITIAL_STATE, Actions.pointSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.point).toEqual({id: 1})
})

test('success retrieving a list of point', () => {
  const state = reducer(INITIAL_STATE, Actions.pointAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.points).toEqual([{id: 1}, {id: 2}])
})

test('success updating a point', () => {
  const state = reducer(INITIAL_STATE, Actions.pointUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.point).toEqual({id: 1})
})
test('success searching a point', () => {
  const state = reducer(INITIAL_STATE, Actions.pointSearchSuccess({id: 1}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toBe(null)
  expect(state.points).toEqual({id: 1})
})
test('success deleting a point', () => {
  const state = reducer(INITIAL_STATE, Actions.pointDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.point).toEqual(null)
})

test('failure retrieving a point', () => {
  const state = reducer(INITIAL_STATE, Actions.pointFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.point).toEqual(null)
})

test('failure retrieving a list of point', () => {
  const state = reducer(INITIAL_STATE, Actions.pointAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.points).toEqual(null)
})

test('failure updating a point', () => {
  const state = reducer(INITIAL_STATE, Actions.pointUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.point).toEqual(INITIAL_STATE.point)
})
test('failure searching a point', () => {
  const state = reducer(INITIAL_STATE, Actions.pointSearchFailure({error: 'Not found'}))

  expect(state.searching).toBe(false)
  expect(state.errorSearching).toEqual({error: 'Not found'})
  expect(state.points).toEqual(null)
})
test('failure deleting a point', () => {
  const state = reducer(INITIAL_STATE, Actions.pointDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.point).toEqual(INITIAL_STATE.point)
})
