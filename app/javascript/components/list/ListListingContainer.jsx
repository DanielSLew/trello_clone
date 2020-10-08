import React from "react";
import { connect } from "react-redux";
import ListListing from "./ListListing";
import store from "../../lib/Store";
import * as actions from "../../actions/BoardActions";

const mapStateToProps = (state) => {
  return {
    lists: store.getState().lists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

// class ListListingContainer extends React.Component {
//   render() {
//     return (
//       <div>
//         <ListListing
//         />
//       </div>
//     );
//   }
// }

export default connect(mapStateToProps, mapDispatchToProps)(ListListing);
