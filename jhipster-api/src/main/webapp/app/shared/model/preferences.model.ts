import { IUser } from 'app/shared/model/user.model';

export const enum Units {
  KG = 'KG',
  LB = 'LB'
}

export interface IPreferences {
  id?: number;
  weeklyGoal?: number;
  weightUnits?: Units;
  user?: IUser;
}

export const defaultValue: Readonly<IPreferences> = {};
