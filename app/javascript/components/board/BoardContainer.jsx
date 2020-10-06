import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/BoardActions";
import { useParams } from "react-router-dom";
import Board from "./Board";

const mapStateToProps = state => {
  return {
    boards: state.boards,
    lists: state.lists,
    cards: state.cards,
    // remove these and use board only
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
    const { id } = this.props.match.params;
    this.props.onFetchBoard(id);
  }

  render() {
    const board = this.props.boards.find((board) => {
      return board.id == this.props.match.params.id;
    }); // filter with own props
    console.log(this.props);
    return (
      <div>
         <Board board={board}></Board>
      </div>
    );
  }
}
// application -> BoardContainer -> connect -> 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContainer);

