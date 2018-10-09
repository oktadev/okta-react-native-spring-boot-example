import FixtureAPI from '../../App/Services/FixtureApi'
import { put } from 'redux-saga/effects'
import { getPreference, getPreferences, updatePreference, deletePreference, searchPreferences } from '../../App/Sagas/PreferenceSagas'
import PreferenceActions from '../../App/Redux/PreferenceRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getPreference(1)
  const step = stepper(getPreference(FixtureAPI, { preferenceId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PreferenceActions.preferenceSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getPreference(FixtureAPI, { preferenceId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PreferenceActions.preferenceFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getPreferences()
  const step = stepper(getPreferences(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PreferenceActions.preferenceAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getPreferences(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PreferenceActions.preferenceAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updatePreference({id: 1})
  const step = stepper(updatePreference(FixtureAPI, { preference: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PreferenceActions.preferenceUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updatePreference(FixtureAPI, { preference: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PreferenceActions.preferenceUpdateFailure()))
})

test('search success path', () => {
  const response = FixtureAPI.searchPreferences()
  const step = stepper(searchPreferences(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PreferenceActions.preferenceSearchSuccess([{id: 1}, {id: 2}])))
})

test('search failure path', () => {
  const response = {ok: false}
  const step = stepper(searchPreferences(FixtureAPI, '*'))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PreferenceActions.preferenceSearchFailure()))
})
test('delete success path', () => {
  const response = FixtureAPI.deletePreference({id: 1})
  const step = stepper(deletePreference(FixtureAPI, { preferenceId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PreferenceActions.preferenceDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deletePreference(FixtureAPI, { preferenceId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PreferenceActions.preferenceDeleteFailure()))
})
