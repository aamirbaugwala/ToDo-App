// App.js
import React, { useEffect, useState } from "react";
import "./App.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import EditForm from "./components/EditForm";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodo, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedtodos, setCompletedtodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    let savedtodo = JSON.parse(localStorage.getItem('TodoList')) || [];
    let savedCompletedtodo = JSON.parse(localStorage.getItem('CompletedTodoList')) || [];

    if (savedtodo) {
      setTodos(savedtodo);
    }
    if (savedCompletedtodo) {
      setCompletedtodos(savedCompletedtodo);
    }
  }, []);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodoItem];
      localStorage.setItem('TodoList', JSON.stringify(updatedTodos));
      return updatedTodos;
    });

    setNewTitle("");
    setNewDescription("");
  };

  const handleDeleteTodo = (index) => {
    let reducedtodo = [...allTodo];
    reducedtodo.splice(index, 1);
    localStorage.setItem('TodoList', JSON.stringify(reducedtodo));
    setTodos(reducedtodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let completedOn = now.toLocaleString();

    let filteredtodo = {
      ...allTodo[index],
      completedOn: completedOn
    };

    let updatedCompletedarr = [...completedtodos, filteredtodo];
    setCompletedtodos(updatedCompletedarr);

    handleDeleteTodo(index);

    localStorage.setItem('CompletedTodoList', JSON.stringify(updatedCompletedarr));
  };

  const handleDeleteCompletedTodo = (index) => {
    setCompletedtodos((prevCompletedTodos) => {
      const updatedCompletedTodos = [...prevCompletedTodos];
      updatedCompletedTodos.splice(index, 1);
      localStorage.setItem('CompletedTodoList', JSON.stringify(updatedCompletedTodos));
      return updatedCompletedTodos;
    });
  };

  const handleEdit = (index, item) => {
    setNewTitle(item.title);
    setNewDescription(item.description);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const updatedTodo = [...allTodo];
      updatedTodo[editIndex] = { title: newTitle, description: newDescription };
      setTodos(updatedTodo);
      localStorage.setItem('TodoList', JSON.stringify(updatedTodo));
      setIsEditing(false);
      setEditIndex(null);
      setNewTitle("");
      setNewDescription("");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditIndex(null);
    setNewTitle("");
    setNewDescription("");
  };

  return (
    <div>
      <h1>My ToDo List</h1>

      <div className="todo-wrapper">
        <TodoInput
          newTitle={newTitle}
          newDescription={newDescription}
          setNewTitle={setNewTitle}
          setNewDescription={setNewDescription}
          handleAddTodo={handleAddTodo}
        />

        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <TodoList
          isCompleteScreen={isCompleteScreen}
          allTodo={allTodo}
          completedtodos={completedtodos}
          handleDeleteTodo={handleDeleteTodo}
          handleComplete={handleComplete}
          handleEdit={handleEdit}
          handleDeleteCompletedTodo={handleDeleteCompletedTodo} 
        />

        {isEditing && (
          <EditForm
            newTitle={newTitle}
            newDescription={newDescription}
            setNewTitle={setNewTitle}
            setNewDescription={setNewDescription}
            handleSaveEdit={handleSaveEdit}
            handleCancelEdit={handleCancelEdit}
          />
        )}
      </div>
    </div>
  );
}

export default App;
