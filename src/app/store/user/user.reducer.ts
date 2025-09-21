import { createReducer, on } from '@ngrx/store';
import { SafeUser, User } from '../../models/user.mode';
import {
  clearUserInfoSuccess,
  loginUserSuccess,
  registerUserSuccess,
} from './user.action';

const INITIAL_STATE: SafeUser = {
  userName: '',
  token: '',
};

export const UserReducer = createReducer(
  INITIAL_STATE,
  on(registerUserSuccess, (state, actions) => {
    return actions.user;
  }),
  on(loginUserSuccess, (state, action) => {
    return {
      ...state,
      token: action.token,
    };
  }),
  on(clearUserInfoSuccess, (state, action) => INITIAL_STATE)
);
