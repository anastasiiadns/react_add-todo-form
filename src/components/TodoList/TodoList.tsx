import { TodoInfo } from '../TodoInfo';
import React from 'react';
import { User } from '../UserInfo';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="box">
      {todos.map(todo => (
        <li key={todo.id}>
          <TodoInfo todo={todo} />
        </li>
      ))}
    </ul>
  );
};
