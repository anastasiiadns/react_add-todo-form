import React from 'react';
import { User, UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo & { user?: User };
};

export const TodoInfo: React.FC<Props> = ({ todo }: { todo: Todo }) => {
  return (
    <div
      className={`box TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      data-id={todo.id}
    >
      <div className="TodoInfo__title">{todo.title}</div>
      {todo.user && <UserInfo user={todo.user} />}
    </div>
  );
};
