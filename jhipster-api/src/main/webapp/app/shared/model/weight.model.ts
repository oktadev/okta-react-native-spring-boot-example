import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';

export interface IWeight {
  id?: number;
  timestamp?: Moment;
  weight?: number;
  user?: IUser;
}

export const defaultValue: Readonly<IWeight> = {};
