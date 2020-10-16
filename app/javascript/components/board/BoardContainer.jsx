import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/BoardActions";
import * as cardActions from "../../actions/CardActions";
import { useParams } from "react-router-dom";
import Board from "./Board";

const mapStateToProps = (state, ownProps) => {
  const url = ownProps.match.url;
  let card;

  if (url.match("boards")) {
    return {
      board: state.boards.find((board) => {
        return board.id === +ownProps.match.params.id;
      }),
      boardId: +ownProps.match.params.id,
    };
  } else {
    card = state.cards.find((card) => {
      return card.id === +ownProps.match.params.id;
    });

    if (card) {
      return {
        board: state.boards.find((board) => {
          return board.id === card.board_id;
        }),
        boardId: card.board_id,
        card,
      };
    } else {
      return { board: null, boardId: null, card: card };
    }
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  //instead of id
  return {
    onFetchBoard: (boardId) => {
      dispatch(actions.fetchBoard(boardId));
    },
  };
};

class BoardContainer extends React.Component {
  handleAddToList = () => {};

  componentDidMount() {
    const url = this.props.match.url;
    let boardId;

    if (url.match("boards")) {
      boardId = +this.props.match.params.id;
    } else {
      if (this.props.card) {
        boardId = this.props.card.board_id;
      } else {
        boardId = null;
      }
    }

    if (!boardId) return;

    this.props.onFetchBoard(boardId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.boardId !== this.props.boardId && this.props.boardId) {
      this.props.onFetchBoard(this.props.boardId);
    }
  }

  render() {
    return (
      <div>
        <Board
          handleAddToList={this.handleAddToList}
          board={this.props.board || {}}
        ></Board>
      </div>
    );
  }
}
// application -> BoardContainer -> connect ->
export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
