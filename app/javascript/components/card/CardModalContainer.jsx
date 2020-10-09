import React from "react";
import { connect } from "react-redux";
import CardModal from "./CardModal";
import * as cardActions from "../../actions/CardActions";

const mapStateToProps = (state, ownProps) => {
  return {
    card: state.cards.find((card) => {
      return card.id === +ownProps.match.params.id;
    })
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFetchCard: () => {
      dispatch(cardActions.fetchCard(+ownProps.match.params.id))
    }
  };
};

class CardModalContainer extends React.Component {
  componentDidMount() {
    this.props.onFetchCard();
  }

  render() {
    return (
      <div>
        <CardModal
          card={this.props.card || {}}
        ></CardModal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardModalContainer);
