import React from "react";
import AddListButtonContainer from "./AddListButtonContainer";
import ListItemContainer from "./ListItemContainer";

const ListListing = ({ lists, boardId }) => {
  const listItems = lists.map((list) => {
    return <ListItemContainer key={list.id} list={list} />;
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
