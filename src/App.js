import React, { useEffect, useState } from "react";
import "./App.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

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

    if (savedtodo){
    setTodos(savedtodo);
    }
    if(savedCompletedtodo){
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
    localStorage.setItem('TodoList', JSON.stringify(reducedtodo))
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

  const handleSaveEdit = () =>{
    if(editIndex!=null){
      const updatedTodo = [...allTodo];
      updatedTodo[editIndex] = {title:newTitle, description:newDescription};
      setTodos(updatedTodo);
      localStorage.setItem('TodoList',JSON.stringify(updatedTodo));
      setIsEditing(false);
      setEditIndex(null);
      setNewTitle("");
      setNewDescription("");
    }
  };

  const handleCancelEdit = ()=>{
    setIsEditing(false);
    setEditIndex(null);
    setNewTitle("");
    setNewDescription("");
  }

  return (
    <div>
      <h1>My ToDo List</h1>

      <div className="todo-wrapper">
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

        <div className="todo-list">
          {isCompleteScreen===false && allTodo.map((item, index) => (
            <div className="todo-list-item" key={index}>
              <div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
              <div>
                <AiOutlineDelete
                  className="icon"
                  onClick={() => handleDeleteTodo(index)}
                  title="Delete?"
                />
                <BsCheckLg
                  className="check-icon"
                  onClick={() => handleComplete(index)}
                  title="Complete?"
                />
                <AiOutlineEdit
                  className="check-icon"
                  onClick={() => handleEdit(index, item)}
                  title="Edit?"
                />
              </div>
            </div>
          ))}
          {isCompleteScreen===true && completedtodos.map((item, index) => (
            <div className="todo-list-item" key={index}>
              <div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p>Completed on: {item.completedOn}</p>
              </div>
              <div>
                <AiOutlineDelete
                  className="icon"
                  onClick={() => handleDeleteCompletedTodo(index)}
                  title="Delete?"
                />
                
              </div>
            </div>
          ))}
        </div>

        {isEditing && (
          <div className="edit__wrapper">
            <label >Title</label>
            <input type="text" value={newTitle} onChange={(e)=> setNewTitle(e.target.value)} />

            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} />
            <button className="primaryBtn" onClick={handleSaveEdit}>Save</button>
            <button className="secondaryBtn" onClick={handleCancelEdit}>Cancel</button>
          </div>
        )}


      </div>
    </div>
  );
}

export default App;
