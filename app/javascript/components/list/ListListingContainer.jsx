import React from "react";
import { connect } from "react-redux";
import ListListing from "./ListListing";
import store from "../../lib/Store";
import * as actions from "../../actions/BoardActions";
import * as cardActions from "../../actions/CardActions";

const mapStateToProps = (state, ownProps) => {
  return {
    lists: state.lists.filter((list) => {
      return list.board_id === ownProps.boardId;
    }),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateCard: (newCard, callback) => {
      dispatch(cardActions.createCard(newCard));
      callback();
    },
  };
};

class ListListingContainer extends React.Component {
  state = {
    activeListId: null,
  };

  handleCardForm = (listId) => {
    this.setState({ activeListId: listId });
  };

  handleCloseCardForm = () => {
    this.setState({ activeListId: null });
  };

  handleNewCard = (cardTitle) => {
    const newCard = {
      list_id: this.state.activeListId,
      card: {
        title: cardTitle,
      },
    };

    this.props.onCreateCard(newCard, this.handleCloseCardForm);
  };

  render() {
    return (
      <div>
        <ListListing
          handleCardForm={this.handleCardForm}
          activeListId={this.state.activeListId}
          lists={this.props.lists || []}
          handleCloseCardForm={this.handleCloseCardForm}
          handleNewCard={this.handleNewCard}
          boardId={this.props.boardId}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListListingContainer);
