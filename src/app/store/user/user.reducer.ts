import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.mode';
import { loginUserSuccess, registerUserSuccess } from './user.action';

const INITIAL_STATE: User = {
  userName: '',
  password: '',
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
  })
);
