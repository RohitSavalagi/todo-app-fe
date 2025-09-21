import { SafeUser, User } from './../../models/user.mode';
import { createAction, props } from '@ngrx/store';

export const registerUser = createAction(
  '[Register Componet] Register User',
  props<{ user: User }>()
);

export const loginUser = createAction(
  '[login Componet] login User',
  props<{ user: User }>()
);

export const registerUserSuccess = createAction(
  '[Register Componet] Register User Success',
  props<{ user: SafeUser }>()
);

export const loginUserSuccess = createAction(
  '[login Componet] login User Success',
  props<{ token: string }>()
);

export const clearUserInfo = createAction(
  '[Login Component] Clearing User Info'
);

export const clearUserInfoSuccess = createAction(
  '[Login Component] Clearing User Info Successful'
);
