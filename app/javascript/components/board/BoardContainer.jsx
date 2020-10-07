import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/BoardActions";
import { useParams } from "react-router-dom";
import Board from "./Board";
import store from "../../lib/Store";

const mapStateToProps = (state, ownProps) => {
  return {
    board: store.getState().boards.find((board) => {
      return board.id == ownProps.match.params.id;
    })
  };
};

const mapDispatchToProps = (dispatch, ownProps) => { //instead of id
  return {
    onFetchBoard: () => {
      dispatch(actions.fetchBoard(+ownProps.match.params.id));
    }
  };
};

class BoardContainer extends React.Component {
  // state = {
    
  // };
  componentDidMount() {
    this.props.onFetchBoard();
  }

  render() {
    return (
      <div>
         <Board board={this.props.board}></Board>
      </div>
    );
  }
}
// application -> BoardContainer -> connect -> 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContainer);

