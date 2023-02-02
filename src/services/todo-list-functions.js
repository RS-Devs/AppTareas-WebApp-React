export const addTodo = (todos, setTodos, text) => {
  const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
  setTodos([...todos, { id: Math.random(), text: capitalizedText }]);
};

export const deleteTodo = (todos, setTodos, id) => {
  setTodos(todos.filter((todo) => todo.id !== id));
};

export const editTodo = (todos, setTodos, id, newValue) => {
  const newTodos = todos.map((todo) => {
    if (todo.id === id) {
      todo.text = newValue;
    }
    return todo;
  });
  setTodos(newTodos);
};


