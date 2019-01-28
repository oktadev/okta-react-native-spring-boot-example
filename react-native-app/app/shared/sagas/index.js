import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'
import FixtureAPI from '../services/fixture-api'
import DebugConfig from '../../config/debug-config'

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer'
import { LoginTypes } from '../../modules/login/login.reducer'
import { AccountTypes } from '../../shared/reducers/account.reducer'
import { RegisterTypes } from '../../modules/account/register/register.reducer'
import { ForgotPasswordTypes } from '../../modules/account/password-reset/forgot-password.reducer'
import { ChangePasswordTypes } from '../../modules/account/password/change-password.reducer'
import { UserTypes } from '../../shared/reducers/user.reducer'
import { PointTypes } from '../../modules/entities/points/points.reducer'
import { BloodPressureTypes } from '../../modules/entities/blood-pressure/blood-pressure.reducer'
import { WeightTypes } from '../../modules/entities/weight/weight.reducer'
import { PreferenceTypes } from '../../modules/entities/preferences/preferences.reducer'
// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga'
import { login, logout, loginLoad } from '../../modules/login/login.sagas'
import { register } from '../../modules/account/register/register.sagas'
import { forgotPassword } from '../../modules/account/password-reset/forgot-password.sagas'
import { changePassword } from '../../modules/account/password/change-password.sagas'
import { getAccount, updateAccount } from '../../shared/sagas/account.sagas'
import { getUser, getUsers, updateUser, deleteUser } from '../../shared/sagas/user.sagas'
import { getPoint, getPoints, updatePoint, deletePoint, searchPoints } from '../../modules/entities/points/points.sagas'
import { getBloodPressure, getBloodPressures, updateBloodPressure, deleteBloodPressure, searchBloodPressures } from '../../modules/entities/blood-pressure/blood-pressure.sagas'
import { getWeight, getWeights, updateWeight, deleteWeight, searchWeights } from '../../modules/entities/weight/weight.sagas'
import { getPreference, getPreferences, updatePreference, deletePreference, searchPreferences } from '../../modules/entities/preferences/preferences.sagas'
// ignite-jhipster-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),

    takeLatest(PointTypes.POINT_REQUEST, getPoint, api),
    takeLatest(PointTypes.POINT_ALL_REQUEST, getPoints, api),
    takeLatest(PointTypes.POINT_UPDATE_REQUEST, updatePoint, api),
    takeLatest(PointTypes.POINT_DELETE_REQUEST, deletePoint, api),
    takeLatest(PointTypes.POINT_SEARCH_REQUEST, searchPoints, api),

    takeLatest(BloodPressureTypes.BLOOD_PRESSURE_REQUEST, getBloodPressure, api),
    takeLatest(BloodPressureTypes.BLOOD_PRESSURE_ALL_REQUEST, getBloodPressures, api),
    takeLatest(BloodPressureTypes.BLOOD_PRESSURE_UPDATE_REQUEST, updateBloodPressure, api),
    takeLatest(BloodPressureTypes.BLOOD_PRESSURE_DELETE_REQUEST, deleteBloodPressure, api),
    takeLatest(BloodPressureTypes.BLOOD_PRESSURE_SEARCH_REQUEST, searchBloodPressures, api),

    takeLatest(WeightTypes.WEIGHT_REQUEST, getWeight, api),
    takeLatest(WeightTypes.WEIGHT_ALL_REQUEST, getWeights, api),
    takeLatest(WeightTypes.WEIGHT_UPDATE_REQUEST, updateWeight, api),
    takeLatest(WeightTypes.WEIGHT_DELETE_REQUEST, deleteWeight, api),
    takeLatest(WeightTypes.WEIGHT_SEARCH_REQUEST, searchWeights, api),

    takeLatest(PreferenceTypes.PREFERENCE_REQUEST, getPreference, api),
    takeLatest(PreferenceTypes.PREFERENCE_ALL_REQUEST, getPreferences, api),
    takeLatest(PreferenceTypes.PREFERENCE_UPDATE_REQUEST, updatePreference, api),
    takeLatest(PreferenceTypes.PREFERENCE_DELETE_REQUEST, deletePreference, api),
    takeLatest(PreferenceTypes.PREFERENCE_SEARCH_REQUEST, searchPreferences, api),
    // ignite-jhipster-saga-redux-connect-needle

    takeLatest(UserTypes.USER_REQUEST, getUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, getUsers, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, deleteUser, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api)
  ])
}
