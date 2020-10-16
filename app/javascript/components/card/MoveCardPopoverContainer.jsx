import React from "react";
import { connect } from "react-redux";
import MoveCardPopover from "./MoveCardPopover";
import * as actions from "../../actions/BoardActions";
import * as cardActions from "../../actions/CardActions";
import store from "../../lib/Store";

const mapStateToProps = (state, ownProps) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchBoards: () => {
      dispatch(actions.fetchBoards());
    },
    onFetchBoard: (boardId, callback) => {
      // if (url.match("boards")) {
      dispatch(actions.fetchBoard(boardId));
      callback();
      // }
    },
    onSubmit: (id, updatedCard, callback) => {
      dispatch(cardActions.updateCard(id, updatedCard));
      callback();
    },
  };
};

class MoveCardPopoverContainer extends React.Component {
  state = {
    boardId: this.props.card.board_id,
    listId: this.props.card.list_id,
  };

  componentDidMount() {
    this.props.onFetchBoards();
  }

  handleChangedSelected = (type, id) => {
    if (type === "board") {
      this.props.onFetchBoard(id, () => {
        this.setState({ boardId: id });
      });
    } else {
      this.setState({ listId: id });
    }
  };

  handleMoveCard = () => {
    const updatedCard = {
      card: {
        list_id: this.state.listId,
      },
    };
    this.props.onSubmit(this.props.card.id, updatedCard, () => {
      this.props.toggleMovePopover();
    });
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
        handleMoveCard={this.handleMoveCard}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveCardPopoverContainer);
