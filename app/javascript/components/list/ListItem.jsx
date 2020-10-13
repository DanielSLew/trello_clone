import React from "react";
import CardListingContainer from "../card/CardListingContainer";

const ListItem = ({
  state,
  list,
  visibleForm,
  handleUpdateListSubmit,
  handleEditListClick,
  handleTextChange,
  active,
  handleCardForm,
  handleCloseCardForm,
  handleNewCard,
  handleCardTitleChange,
}) => {
  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      handleUpdateListSubmit(e);
    }
  };

  const handleAddClick = () => {
    handleCardForm(list.id);
  };

  const onNewCardClick = (e) => {
    handleNewCard(state.newCardTitle);
  };

  const activeCard = active ? "active-card" : "";
  const dropdown = active ? "add-dropdown-active" : "";
  return (
    <div className={`list-wrapper ${dropdown}`}>
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            {visibleForm && (
              <input
                onBlur={handleUpdateListSubmit}
                onKeyPress={handleKeyPress}
                onChange={handleTextChange}
                type="text"
                className="list-title"
                value={state.title}
                autoFocus={true}
              />
            )}
            {!visibleForm && (
              <p onClick={handleEditListClick} className="list-title">
                {state.title}
              </p>
            )}
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <CardListingContainer listId={list.id} />
          <div className={`add-dropdown add-bottom ${activeCard}`}>
            <div className="card">
              <div className="card-info"></div>
              <textarea
                name="add-card"
                onChange={handleCardTitleChange}
                value={state.newCardTitle}
              ></textarea>
              <div className="members"></div>
            </div>
            <a className="button" onClick={onNewCardClick}>
              Add
            </a>
            <i className="x-icon icon" onClick={handleCloseCardForm}></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div
            onClick={handleAddClick}
            className="add-card-toggle"
            data-position="bottom"
          >
            Add a card...
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
