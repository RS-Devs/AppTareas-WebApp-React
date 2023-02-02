import React, { useState, useEffect } from "react";
import { addTodo, deleteTodo } from "./services/todo-list-functions";
import { validateInput, validateMaxInput } from "./services/validation";
import "./App.css";

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [filter, setFilter] = useState("all"); // Nuevo estado para el filtro

  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    if (error.error) {
      setTimeout(() => {
        setError({
          error: false,
          message: "",
        });
      }, 3000);
    }
  }, [error]);

  const handleInput = (e) => {
    let input = e.target.value;
    input = input.charAt(0).toUpperCase() + input.slice(1);
    setInputValue(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error, message } = validateInput(inputValue);
    if (error) {
      setError({
        error: true,
        message: message,
      });
      return;
    }
    const { error: errorMax, message: messageMax } =
      validateMaxInput(inputValue);
    if (errorMax) {
      setError({
        error: true,
        message: messageMax,
      });
      return;
    }
    setError({
      error: false,
      message: "",
    });
    addTodo(todos, setTodos, inputValue);
    setInputValue("");
  };

  const handleToggle = (todoId) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return todo;
    } else if (filter === "completed") {
      return todo.completed;
    } else if (filter === "pending") {
      return !todo.completed;
    }
  });

  const showDeleteButton = () => {
    const completedTodos = todos.filter((todo) => todo.completed);
    return completedTodos.length > 0;
  };

  const handleDeleteCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const handleDeleteAll = () => {
    setTodos([]);
  };

  return (
    <>
      {" "}
      <div>
        <nav className="navbar">
          <h1 className="tit">
            App de Tareas <span>React</span>
          </h1>
          <h5 className="sub-tit">
            Created<span className="sub-tit-two"> by </span>
            <span className="sub-span">RS</span>-
            <span className="sub-span">DEVS</span>
          </h5>
        </nav>
      </div>
      <div className="todo-list">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            value={inputValue}
            onChange={handleInput}
            placeholder="Agrega una tarea"
          />
          <button type="submit" className="button">
            Agregar
          </button>
        </form>
        {error.error && (
          <div className="error-message">
            <p>{error.message}</p>
          </div>
        )}

        <div className="filters">
          <p>Filtrar por:</p>
          <select
            className="select-style"
            onChange={handleFilter}
            value={filter}
          >
            <option value="all">Todas</option>
            <option value="completed">Completadas</option>
            <option value="pending">Pendientes</option>
          </select>
        </div>

        <div className="todo-list">
          <h2 className="task-tit">Tareas</h2>
          {filteredTodos.map((todo) => (
            <div key={todo.id} className="todo">
              <input
                type="checkbox"
                className="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
              />
              <p
                className={`text ${todo.completed ? "completed" : ""}`}
                onClick={() => editingTodo(todo.id)}
              >
                {todo.text}
              </p>

              <button
                className="button delete"
                onClick={() => deleteTodo(todos, setTodos, todo.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
          {showDeleteButton() && (
            <button
              type="button"
              className="delete-completed"
              onClick={handleDeleteCompleted}
            >
              Eliminar tareas completadas
            </button>
          )}

          {todos.length > 1 && (
            <button
              type="button"
              className="delete-all"
              onClick={handleDeleteAll}
            >
              Eliminar todas las tareas
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ToDoList;
