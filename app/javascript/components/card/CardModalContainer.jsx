import React from "react";
import { connect } from "react-redux";
import CardModal from "./CardModal";
import * as cardActions from "../../actions/CardActions";
import * as boardActions from "../../actions/BoardActions";

const mapStateToProps = (state, ownProps) => {
  return {
    card: state.cards.find((card) => {
      return card.id === +ownProps.match.params.id;
    }),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFetchCard: () => {
      dispatch(cardActions.fetchCard(+ownProps.match.params.id))
    },
    dispatch: dispatch,
  };
};

const mergeCardModalProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onFetchBoard: (board_id) => {
        dispatchProps.dispatch(boardActions.fetchBoard(board_id))
      },
  }
};

class CardModalContainer extends React.Component {
  state = {
    boardLoaded: false
  }

  componentDidMount() {
    this.props.onFetchCard();
  }

  componentDidUpdate() {
    if (this.props.card && !this.state.boardLoaded) {
      this.props.onFetchBoard(this.props.card.board_id);
      this.setState({ boardLoaded: true });
    }
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

export default connect(mapStateToProps, mapDispatchToProps, mergeCardModalProps)(CardModalContainer);
