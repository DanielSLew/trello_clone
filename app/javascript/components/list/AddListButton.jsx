import React from "react";
// import { useParams } from "react-router-dom";

const AddListButton = ({
  handleNewListClick,
  state,
  handleCloseNewListClick,
  handleNewListSubmit,
  handleTextChange,
}) => {
  const onSubmit = (e) => {
    e.stopPropagation();

    handleNewListSubmit(state.title);
  };

  const formVisible = state.visibleForm ? "selected" : "";
  return (
    <div
      onClick={handleNewListClick}
      id="new-list"
      className={`new-list ${formVisible}`}
    >
      <span>Add a list...</span>
      <input
        onChange={handleTextChange}
        type="text"
        placeholder="Add a list..."
        value={state.title}
      />
      <div>
        <input
          onClick={onSubmit}
          type="submit"
          className="button"
          value="Save"
        />
        <i onClick={handleCloseNewListClick} className="x-icon icon"></i>
      </div>
    </div>
  );
};

export default AddListButton;
