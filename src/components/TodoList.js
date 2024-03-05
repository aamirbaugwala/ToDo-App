// TodoList.js
import React from "react";
import { AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function TodoList({ isCompleteScreen, allTodo, completedtodos, handleDeleteTodo, handleComplete, handleEdit,handleDeleteCompletedTodo }) {
  return (
    <div className="todo-list">
      {isCompleteScreen === false &&
        allTodo.map((item, index) => (
          <div className="todo-list-item" key={index}>
            <div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
            <div>
              <AiOutlineDelete className="icon" onClick={() => handleDeleteTodo(index)} title="Delete?" />
              <BsCheckLg className="check-icon" onClick={() => handleComplete(index)} title="Complete?" />
              <AiOutlineEdit className="check-icon" onClick={() => handleEdit(index, item)} title="Edit?" />
            </div>
          </div>
        ))}
      {isCompleteScreen === true &&
        completedtodos.map((item, index) => (
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
  );
}

export default TodoList;
