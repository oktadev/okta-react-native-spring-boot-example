import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise-middleware';
import axios from 'axios';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import userManagement, { ACTION_TYPES, getUsers } from 'app/shared/reducers/user-management';

describe('User management reducer tests', () => {
  const initialState = {
    users: [],
    errorMessage: null
  };

  describe('Common', () => {
    it('should return the initial state', () => {
      expect(userManagement(undefined, {})).toEqual({ ...initialState });
    });
  });

  describe('Failures', () => {
    it('should set state to failed and put an error message in errorMessage', () => {
      expect(userManagement(undefined, { type: FAILURE(ACTION_TYPES.FETCH_USERS), payload: 'something happened' })).toEqual({
        ...initialState,
        errorMessage: 'something happened'
      });
    });
  });

  describe('Success', () => {
    it('should update state according to a successful fetch users request', () => {
      const payload = { data: 'some handsome users' };
      const toTest = userManagement(undefined, { type: SUCCESS(ACTION_TYPES.FETCH_USERS), payload });
      expect(toTest).toMatchObject({
        users: payload.data
      });
    });
  });

  describe('Actions', () => {
    let store;

    const resolvedObject = { value: 'whatever' };
    beforeEach(() => {
      const mockStore = configureStore([thunk, promiseMiddleware()]);
      store = mockStore({});
      axios.get = sinon.stub().returns(Promise.resolve(resolvedObject));
    });

    it('dispatches FETCH_USERS_PENDING and FETCH_USERS_FULFILLED actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.FETCH_USERS)
        },
        {
          type: SUCCESS(ACTION_TYPES.FETCH_USERS),
          payload: resolvedObject
        }
      ];
      await store.dispatch(getUsers()).then(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('dispatches FETCH_USERS_PENDING and FETCH_USERS_FULFILLED actions with pagination options', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.FETCH_USERS)
        },
        {
          type: SUCCESS(ACTION_TYPES.FETCH_USERS),
          payload: resolvedObject
        }
      ];
      await store.dispatch(getUsers(1, 20, 'id,desc')).then(() => expect(store.getActions()).toEqual(expectedActions));
    });
  });
});
