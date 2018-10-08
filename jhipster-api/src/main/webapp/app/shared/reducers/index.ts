import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from './user-management';
// prettier-ignore
import bloodPressure, {
  BloodPressureState
} from 'app/entities/blood-pressure/blood-pressure.reducer';
// prettier-ignore
import weight, {
  WeightState
} from 'app/entities/weight/weight.reducer';
// prettier-ignore
import points, {
  PointsState
} from 'app/entities/points/points.reducer';
// prettier-ignore
import preferences, {
  PreferencesState
} from 'app/entities/preferences/preferences.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly bloodPressure: BloodPressureState;
  readonly weight: WeightState;
  readonly points: PointsState;
  readonly preferences: PreferencesState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  bloodPressure,
  weight,
  points,
  preferences,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
