import React from "react";
import CardListingContainer from "../card/CardListingContainer";
import AddListButtonContainer from "./AddListButtonContainer";

const ListListing = ({ lists, boardId }) => {
  const listItems = lists.map((list) => {
    return (
      <div className="list-wrapper" key={list.id}>
        <div className="list-background">
          <div className="list">
            <a className="more-icon sm-icon" href=""></a>
            <div>
              <p className="list-title">{list.title}</p>
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
  });

  return (
    <div id="list-container" className="list-container">
      <div id="existing-lists" className="existing-lists">
        {listItems}
      </div>
      <AddListButtonContainer boardId={boardId} />
    </div>
  );
};

export default ListListing;
