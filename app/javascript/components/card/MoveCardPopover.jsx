import React from "react";

const MoveCardPopover = ({
  handleUpdateLists,
  toggleMovePopover,
  state,
  card,
}) => {
  const onCloseClick = (e) => {
    e.preventDefault();
    toggleMovePopover();
  };

  let currentBoardTitle;

  const boardOptions = state.boards.map((board) => {
    let selected;

    if (board.id === card.board_id) {
      currentBoardTitle = board.title;
      selected = true;
    }
    return (
      <option selected={selected} value={board.id} key={board.id}>
        {board.title}
      </option>
    );
  });

  let currentListTitle;

  const listOptions = state.lists.map((list) => {
    let selected;
    if (list.id === card.list_id) {
      currentListTitle = list.title;
      selected = true;
    }

    return (
      <option selected={selected} value={list.id} key={list.id}>
        {list.title}
      </option>
    );
  });

  const handleUpdateListsChange = (e) => {
    const boardId = e.target.value;
    handleUpdateLists(+boardId);
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
            <select onChange={handleUpdateListsChange}>{boardOptions}</select>
          </div>
          <div>
            <div class="button-link setting list">
              <span class="label">List</span>
              <span class="value js-list-value">{currentListTitle}</span>
              <label>List</label>
              <select>{listOptions}</select>
            </div>
            <div class="button-link setting position">
              <span class="label">Position</span>
              <span class="value">1</span>
              <label>Position</label>
              <select>
                <option value="top" selected="selected">
                  1 (current)
                </option>
                <option value="98303">2</option>
                <option value="163839">3</option>
                <option value="212991">4</option>
                <option value="245759">5</option>
                <option value="278527">6</option>
                <option value="311295">7</option>
                <option value="bottom">8</option>
              </select>
            </div>
          </div>

          <button class="button" type="submit">
            Move
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoveCardPopover;
