import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/BoardActions";

const mapStateToProps = state => {
  return {
    board: state.board
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchBoard: (id) => {
      dispatch(actions.fetchBoard(id));
    }
  };
};

class BoardContainer extends React.Component {
  // state = {
    
  // };
  componentDidMount() {
    this.props.onFetchBoard(4);
  }

  render() {
    return (
      <div>
         {JSON.stringify(this.props.board)}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContainer);

