import { AppState } from '../state';
import { createSelector } from '@ngrx/store';

const selectState = (state: AppState) => state;
export const selectUser = createSelector(selectState, (state) => state.user);
