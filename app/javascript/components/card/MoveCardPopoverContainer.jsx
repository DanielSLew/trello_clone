import React from "react";
import { connect } from "react-redux";
import MoveCardPopover from "./MoveCardPopover";
import * as actions from "../../actions/BoardActions";
import store from "../../lib/Store";

const mapStateToProps = (state, ownProps) => {
  return {
    // boards: state.boards || [],
    // lists:
    //   state.lists.filter((list) => {
    //     return ownProps.card.board_id === list.board_id;
    //   }) || [],
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchBoards: () => {
      dispatch(actions.fetchBoards());
    },
    onFetchBoard: (boardId) => {
      // if (url.match("boards")) {
      dispatch(actions.fetchBoard(boardId));
      // }
    },
  };
};

class MoveCardPopoverContainer extends React.Component {
  state = {
    boardId: this.props.state.card.board_id,
    listId: this.props.state.card.list_id,
  };

  componentDidMount() {
    this.props.onFetchBoards();
  }

  handleChangedSelected = (type, id) => {
    if (type === "board") {
      this.setState({ boardId: id });
    } else {
      this.setState({ listId: id });
    }
  };

  render() {
    return (
      <MoveCardPopover
        toggleMovePopover={this.props.toggleMovePopover}
        handleUpdateLists={this.props.onFetchBoard}
        handleChangedSelected={this.handleChangedSelected}
        card={this.props.card}
        state={this.props.state}
        boardId={this.state.boardId}
        listId={this.state.listId}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveCardPopoverContainer);
