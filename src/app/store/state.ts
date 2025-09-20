import { TodoItem } from '../models/todo.interface';
import { User } from '../models/user.mode';

export interface AppState {
  todoList: TodoItem[];
  user: User;
}
