import React from "react";
import { connect } from "react-redux";
import AddListButton from "./AddListButton";
import store from "../../lib/Store";
import * as actions from "../../actions/ListActions";

// const mapStateToProps = (state, ownProps) => {
//   console.log("ownprops", ownProps);
//   return {
//     boardId: +ownProps.match.params.id,
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (newList, callback) => {
      dispatch(actions.createList(newList));
      callback();
    },
  };
};

class AddListButtonContainer extends React.Component {
  state = {
    visibleForm: false,
    title: "",
  };

  handleTextChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleNewListClick = (e) => {
    this.setState({
      visibleForm: true,
    });
  };

  handleCloseNewListClick = (e) => {
    e.stopPropagation();
    this.setState({
      visibleForm: false,
      title: "",
    });
  };

  handleNewListSubmit = (title) => {
    // e.stopPropagation();

    const newList = {
      board_id: this.props.boardId,
      list: {
        title,
      },
    };

    console.log(newList);

    // this.props.onSubmit(newList, () => {
    //   this.handleCloseNewListClick(new Event("click"));
    // });
  };

  render() {
    return (
      <AddListButton
        state={this.state}
        handleNewListClick={this.handleNewListClick}
        handleCloseNewListClick={this.handleCloseNewListClick}
        handleNewListSubmit={this.handleNewListSubmit}
        handleTextChange={this.handleTextChange}
      />
    );
  }
}

export default connect(null, mapDispatchToProps)(AddListButtonContainer);
