// TodoInput.js
import React from "react";

function TodoInput({ newTitle, newDescription, setNewTitle, setNewDescription, handleAddTodo }) {
  return (
    <div className="todo-input">
      <div className="todo-input-item">
        <label>Title</label>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Task title"
        />
      </div>

      <div className="todo-input-item">
        <label>Description</label>
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Description"
        />
      </div>

      <div className="todo-input-item">
        <button type="button" onClick={handleAddTodo} className="primaryBtn">
          Add
        </button>
      </div>
    </div>
  );
}

export default TodoInput;
