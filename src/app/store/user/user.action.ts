import { User } from './../../models/user.mode';
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
  props<{ user: User }>()
);

export const loginUserSuccess = createAction(
  '[login Componet] login User Success',
  props<{ token: string }>()
);
