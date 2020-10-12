import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/BoardActions";
import * as cardActions from "../../actions/CardActions";
import { useParams } from "react-router-dom";
import Board from "./Board";

const mapStateToProps = (state, ownProps) => {
  return {
    board: state.boards.find((board) => {
      return board.id == ownProps.match.params.id;
    }),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  //instead of id
  return {
    onFetchBoard: () => {
      const url = ownProps.match.url;
      
      if (url.match('boards')) {
        dispatch(actions.fetchBoard(+ownProps.match.params.id));
      }
    },
  };
};

class BoardContainer extends React.Component {
  handleAddToList = () => {};

  componentDidMount() {
    this.props.onFetchBoard();
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
