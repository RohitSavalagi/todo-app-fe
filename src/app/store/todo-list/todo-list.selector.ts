import { createSelector } from '@ngrx/store';
import { AppState } from '../state';

const selectState = (state: AppState) => state;
export const selectTodos = createSelector(
  selectState,
  (state) => state.todoList
);
