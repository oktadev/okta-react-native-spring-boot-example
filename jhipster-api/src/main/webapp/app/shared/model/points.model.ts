import { Moment } from 'moment';
import { IUser } from './user.model';

export interface IPoints {
  id?: number;
  date?: Moment;
  exercise?: number;
  meals?: number;
  alcohol?: number;
  notes?: string;
  user?: IUser;
}

export const defaultValue: Readonly<IPoints> = {};
