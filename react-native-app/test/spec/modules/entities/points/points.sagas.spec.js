import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getPoint, getPoints, updatePoint, deletePoint, searchPoints } from '../../../../../app/modules/entities/points/points.sagas'
import PointActions from '../../../../../app/modules/entities/points/points.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getPoint(1)
  const step = stepper(getPoint(FixtureAPI, { pointId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PointActions.pointSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getPoint(FixtureAPI, { pointId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PointActions.pointFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getPoints()
  const step = stepper(getPoints(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PointActions.pointAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getPoints(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PointActions.pointAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updatePoint({id: 1})
  const step = stepper(updatePoint(FixtureAPI, { point: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PointActions.pointUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updatePoint(FixtureAPI, { point: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PointActions.pointUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchPoints()
  const step = stepper(searchPoints(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PointActions.pointSearchSuccess([{id: 1}, {id: 2}])))
})

test('search failure path', () => {
  const response = {ok: false}
  const step = stepper(searchPoints(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PointActions.pointSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deletePoint({id: 1})
  const step = stepper(deletePoint(FixtureAPI, { pointId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PointActions.pointDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deletePoint(FixtureAPI, { pointId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PointActions.pointDeleteFailure()))
})
