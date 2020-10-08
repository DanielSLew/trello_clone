import React from "react";
import { connect } from "react-redux";
import ListItem from "./ListItem";
import * as actions from "../../actions/ListActions";

// const mapStateToProps = (state) => {
//   return {
//     list: store.getState().lists,
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

class ListItemContainer extends React.Component {
  state = {
    visibleForm: false,
    title: this.props.list.title,
  };

  handleTextChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleEditListClick = (e) => {
    this.setState({
      visibleForm: true,
    });
  };

  handleUpdateListSubmit = (title) => {
    e.stopPropagation();

    const updatedList = { title };

    // this.props.onSubmit(newList, () => {
    //   this.handleCloseNewListClick(new Event("click"));
    // });
  };

  render() {
    return (
      <ListItem
        list={this.props.list}
        visibleForm={this.state.visibleForm}
        handleUpdateListSubmit={this.handleUpdateListSubmit}
        handleEditListClick={this.handleEditListClick}
        handleTextChange={this.handleTextChange}
      />
    );
  }
}

export default connect(null, mapDispatchToProps)(ListItemContainer);
