import './App.scss';
import { Todo, TodoList } from './components/TodoList';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [users, setUsers] = useState(0);
  const [hasUsersError, setHasUsersError] = useState(false);

  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const cleanedValue = value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄ0-9 ]/g, '');

    setTitle(cleanedValue);
    setHasTitleError(false);
  };

  const handleUsersChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUsers(+event.target.value);
    setHasUsersError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUsersError(!users);

    if (!title || !users) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));
    const selectedUser = usersFromServer.find(u => u.id === users);

    const newTodo = {
      id: maxId + 1,
      title,
      completed: false,
      userId: users,
      user: selectedUser,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);

    setTitle('');
    setUsers(0);
  };

  return (
    <div className="App section">
      <h1 className="title">Add todo form</h1>

      <form
        className="box"
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label className="label" htmlFor="title-input">
            Title:
          </label>

          <input
            id="title-input"
            className="input is-info"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="user-select">
            User:
          </label>

          <div className="control">
            <div className="select is-info">
              <select
                data-cy="userSelect"
                id="user-select"
                value={users}
                onChange={handleUsersChange}
              >
                <option value="0" disabled>
                  Choose a user
                </option>

                {usersFromServer.map(user => (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {hasUsersError && <span className="error">Please choose a user</span>}
        </div>

        <button
          className="button is-info is-rounded"
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <div>
        <TodoList todos={todos} users={usersFromServer} />
      </div>
    </div>
  );
};
