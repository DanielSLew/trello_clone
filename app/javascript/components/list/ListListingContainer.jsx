import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    lists: state.lists,
    cards: state.cards,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
  };
};

class ListListingContainer extends React.Component {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListListing);