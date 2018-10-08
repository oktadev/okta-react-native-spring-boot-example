import axios from 'axios';
import { ICrudGetAllAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IUser } from 'app/shared/model/user.model';

export const ACTION_TYPES = {
  FETCH_USERS: 'userManagement/FETCH_USERS',
  RESET: 'userManagement/RESET'
};

const initialState = {
  errorMessage: null,
  users: [] as ReadonlyArray<IUser>
};

export type UserManagementState = Readonly<typeof initialState>;

// Reducer
export default (state: UserManagementState = initialState, action): UserManagementState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERS):
      return {
        ...state
      };
    case FAILURE(ACTION_TYPES.FETCH_USERS):
      return {
        ...state,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERS):
      return {
        ...state,
        users: action.payload.data
      };
    case ACTION_TYPES.RESET:
      return {
        ...state,
        users: []
      };
    default:
      return state;
  }
};

const apiUrl = 'api/users';
// Actions
export const getUsers: ICrudGetAllAction<IUser> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_USERS,
    payload: axios.get<IUser>(requestUrl)
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
