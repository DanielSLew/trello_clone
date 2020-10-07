import React from "react";
import { connect } from "react-redux";
import ListListing from "./ListListing";
import store from "../../lib/Store";

const mapStateToProps = state => {
  return {
    lists: store.getState().lists,
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