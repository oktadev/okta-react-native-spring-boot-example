import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { RegisterTypes } from '../Redux/RegisterRedux'
import { PasswordTypes } from '../Redux/PasswordRedux'
import { AccountTypes } from '../Redux/AccountRedux'
import { UserTypes } from '../Redux/UserRedux'
import { PointTypes } from '../Redux/PointRedux'
import { BloodPressureTypes } from '../Redux/BloodPressureRedux'
import { WeightTypes } from '../Redux/WeightRedux'
import { PreferenceTypes } from '../Redux/PreferenceRedux'
// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, logout, loginLoad } from './LoginSagas'
import { register } from './RegisterSagas'
import { forgotPassword, changePassword } from './PasswordSagas'
import { getAccount, updateAccount } from './AccountSagas'
import { getUser, getUsers, updateUser, deleteUser } from './UserSagas'
import { getPoint, getPoints, updatePoint, deletePoint, searchPoints } from './PointSagas'
import { getBloodPressure, getBloodPressures, updateBloodPressure, deleteBloodPressure, searchBloodPressures } from './BloodPressureSagas'
import { getWeight, getWeights, updateWeight, deleteWeight, searchWeights } from './WeightSagas'
import { getPreference, getPreferences, updatePreference, deletePreference, searchPreferences } from './PreferenceSagas'
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
    takeLatest(PasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(PasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),

    takeLatest(UserTypes.USER_REQUEST, getUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, getUsers, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, deleteUser, api),

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

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api)
  ])
}
