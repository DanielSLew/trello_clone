import React from "react";
import { connect } from "react-redux";
import ListListing from "./ListListing";
import store from "../../lib/Store";
import * as actions from "../../actions/BoardActions";

const mapStateToProps = (state) => {
  return {
    lists: state.lists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
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
  }

  render() {
    return (
      <div>
        <ListListing
          handleCardForm={this.handleCardForm}
          activeListId={this.state.activeListId}
          lists={this.props.lists || []}
          handleCloseCardForm={this.handleCloseCardForm}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListListingContainer);
