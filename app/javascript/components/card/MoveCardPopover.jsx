import React from "react";

const MoveCardPopover = ({
  handleUpdateLists,
  toggleMovePopover,
  handleChangedSelected,
  handleMoveCard,
  state,
  card,
  boardId,
  listId,
}) => {
  const onCloseClick = (e) => {
    e.preventDefault();
    toggleMovePopover();
  };

  let currentBoardTitle;
  let currentListTitle;

  const boardOptions = state.boards.map((board) => {
    let selected;

    if (board.id === boardId) {
      currentBoardTitle = board.title;
      selected = true;
    }
    return (
      <option selected={selected} value={board.id} key={board.id}>
        {board.title}
      </option>
    );
  });

  const listOptions = state.lists.filter((list) => {
    return list.board_id === boardId;
  });

  let mappedListOptions;

  if (listOptions.length === 1) {
    currentListTitle = listOptions[0].title;
    mappedListOptions = [
      <option
        selected={selected}
        value={listOptions[0].id}
        key={listOptions[0].id}
      >
        {listOptions[0].title}
      </option>,
    ];
  } else {
    mappedListOptions = listOptions.map((list) => {
      let selected;
      console.log(listId, list);
      if (list.id === listId) {
        currentListTitle = list.title;
        selected = true;
      }

      return (
        <option selected={selected} value={list.id} key={list.id}>
          {list.title}
        </option>
      );
    });
  }

  const handleUpdateListChange = (e) => {
    const listId = e.target.value;
    handleChangedSelected("list", +listId);
  };

  const handleUpdateBoardChange = (e) => {
    const boardId = e.target.value;
    handleChangedSelected("board", +boardId);
  };

  return (
    <div class="popover move-card">
      <div>
        <header>
          <span>Move Card</span>
          <a onClick={onCloseClick} href="" class="icon-sm icon-close"></a>
        </header>
        <div class="content">
          <div class="button-link setting board">
            <span class="label">Board</span>
            <span class="value js-board-value">{currentBoardTitle}</span>
            <label>Board</label>
            <select onChange={handleUpdateBoardChange}>{boardOptions}</select>
          </div>
          <div>
            <div class="button-link setting list">
              <span class="label">List</span>
              <span class="value js-list-value">{currentListTitle}</span>
              <label>List</label>
              <select onChange={handleUpdateListChange}>
                {mappedListOptions}
              </select>
            </div>
            <div class="button-link setting position">
              <span class="label">Position</span>
              <span class="value">End of List</span>
              <label>Position</label>
              <select>
                <option value="top" selected="selected">
                  1 (current)
                </option>
              </select>
            </div>
          </div>

          <button onClick={handleMoveCard} class="button" type="submit">
            Move
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoveCardPopover;
