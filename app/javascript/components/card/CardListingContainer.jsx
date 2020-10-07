import React from "react";
import { connect } from "react-redux";
import CardListing from "./CardListing";
import store from "../../lib/Store";

const mapStateToProps = (state, ownProps) => {
  return {
    cards: store.getState().cards.filter(card => {
      return card.list_id === ownProps.listId;
    }),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

class CardListingContainer extends React.Component {}

export default connect(mapStateToProps, mapDispatchToProps)(CardListing);
