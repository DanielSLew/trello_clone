import React from "react";
import { connect } from "react-redux";
import ListItem from "./ListItem";
import * as actions from "../../actions/ListActions";

// const mapStateToProps = (state) => {
//   return {
//     list: store.getState().lists,
//   };
// };

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.list.id;
  return {
    onSubmit: (updatedList, callback) => {
      dispatch(actions.updateList(id, updatedList));
      callback();
    },
  };
};

class ListItemContainer extends React.Component {
  state = {
    visibleForm: false,
    title: this.props.list.title,
    newCardTitle: "",
  };

  handleTextChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleCardTitleChange = (e) => {
    this.setState({
      newCardTitle: e.target.value,
    });
  };

  handleEditListClick = (e) => {
    this.setState({
      visibleForm: true,
    });
  };

  handleUpdateListSubmit = (e) => {
    if (this.state.title.trim() === "") {
      this.setState({
        title: this.props.list.title,
      });
      return;
    }
    const updatedList = { title: this.state.title };
    this.props.onSubmit(updatedList, () => {
      this.setState({ visibleForm: false });
    });
  };

  render() {
    return (
      <ListItem
        state={this.state}
        list={this.props.list}
        visibleForm={this.state.visibleForm}
        handleUpdateListSubmit={this.handleUpdateListSubmit}
        handleEditListClick={this.handleEditListClick}
        handleTextChange={this.handleTextChange}
        active={this.props.active}
        handleCardForm={this.props.handleCardForm}
        handleCloseCardForm={this.props.handleCloseCardForm}
        handleNewCard={this.props.handleNewCard}
        handleCardTitleChange={this.handleCardTitleChange}
      />
    );
  }
}

export default connect(null, mapDispatchToProps)(ListItemContainer);
