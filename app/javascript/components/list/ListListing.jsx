import React from "react";
import AddListButtonContainer from "./AddListButtonContainer";
import ListItemContainer from "./ListItemContainer";

const ListListing = ({
  lists,
  boardId,
  onCardClick,
  handleCardForm,
  activeListId,
  handleCloseCardForm,
  handleNewCard,
}) => {
  const listItems = lists.map((list) => {
    return (
      <ListItemContainer
        key={list.id}
        list={list}
        onCardClick={onCardClick}
        active={activeListId === list.id}
        handleCardForm={handleCardForm}
        handleCloseCardForm={handleCloseCardForm}
        handleNewCard={handleNewCard}
      />
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
