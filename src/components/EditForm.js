// EditForm.js
import React from "react";

function EditForm({ newTitle, newDescription, setNewTitle, setNewDescription, handleSaveEdit, handleCancelEdit }) {
  return (
    <div className="edit__wrapper">
      <label>Title</label>
      <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />

      <label>Description</label>
      <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
      <button className="primaryBtn" onClick={handleSaveEdit}>
        Save
      </button>
      <button className="secondaryBtn" onClick={handleCancelEdit}>
        Cancel
      </button>
    </div>
  );
}

export default EditForm;
