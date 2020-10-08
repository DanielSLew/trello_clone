import React from "react";
import CardListingContainer from "../card/CardListingContainer";

const ListItem = ({
  list,
  visibleForm,
  handleUpdateListSubmit,
  handleEditListClick,
  handleTextChange,
}) => {
  return (
    <div className="list-wrapper">
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            {visibleForm && (
              <input
                onBlur={handleUpdateListSubmit}
                onChange={handleTextChange}
                type="text"
                className="list-title"
                value={list.title}
                autofocus="true"
              />
            )}
            {!visibleForm && (
              <p onClick={handleEditListClick} className="list-title">
                {list.title}
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
          <div className="add-dropdown add-bottom">
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card"></textarea>
              <div className="members"></div>
            </div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div className="add-card-toggle" data-position="bottom">
            Add a card...
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
