import FixtureAPI from '../../App/Services/FixtureApi'
import { put } from 'redux-saga/effects'
import { getWeight, getWeights, updateWeight, deleteWeight, searchWeights } from '../../App/Sagas/WeightSagas'
import WeightActions from '../../App/Redux/WeightRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getWeight(1)
  const step = stepper(getWeight(FixtureAPI, { weightId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(WeightActions.weightSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getWeight(FixtureAPI, { weightId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(WeightActions.weightFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getWeights()
  const step = stepper(getWeights(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(WeightActions.weightAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getWeights(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(WeightActions.weightAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateWeight({id: 1})
  const step = stepper(updateWeight(FixtureAPI, { weight: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(WeightActions.weightUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateWeight(FixtureAPI, { weight: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(WeightActions.weightUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchWeights()
  const step = stepper(searchWeights(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(WeightActions.weightSearchSuccess([{id: 1}, {id: 2}])))
})

test('search failure path', () => {
  const response = {ok: false}
  const step = stepper(searchWeights(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(WeightActions.weightSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deleteWeight({id: 1})
  const step = stepper(deleteWeight(FixtureAPI, { weightId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(WeightActions.weightDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteWeight(FixtureAPI, { weightId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(WeightActions.weightDeleteFailure()))
})
