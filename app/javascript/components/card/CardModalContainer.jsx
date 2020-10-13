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
      dispatch(cardActions.fetchCard(+ownProps.match.params.id));
    },
    onFetchBoard: (board_id) => {
      dispatch(boardActions.fetchBoard(board_id));
    },
    onSubmit: (id, updatedCard, callback) => {
      dispatch(cardActions.updateCard(id, updatedCard));
      callback();
    },
  };
};

class CardModalContainer extends React.Component {
  state = {
    visibleForm: false,
    title: (this.props.card || {}).title,
    boardLoaded: false,
  };

  componentDidMount() {
    this.props.onFetchCard();
  }

  componentDidUpdate() {
    if (this.props.card && !this.state.boardLoaded) {
      this.props.onFetchBoard(this.props.card.board_id);
      this.setState({ boardLoaded: true });
    }
  }

  handleTextChange = (e) => {
    console.log(e.target.value);
    this.setState({
      title: e.target.value,
    });
  };

  handleEditCardTitleClick = (e) => {
    console.log(this.state);
    this.setState({
      visibleForm: true,
    });
  };

  handleUpdateCardSubmit = (e) => {
    if (this.state.title.trim() === "") {
      this.setState({
        title: this.props.card.title,
      });
      return;
    }

    const updatedCard = {
      card: {
        title: this.state.title,
      },
    };

    this.props.onSubmit(this.props.card.id, updatedCard, () => {
      this.setState({
        visibleForm: false,
      });
    });
  };

  render() {
    return (
      <div>
        <CardModal
          card={this.props.card || {}}
          handleTextChange={this.handleTextChange}
          handleUpdateCardSubmit={this.handleUpdateCardSubmit}
          handleEditCardTitleClick={this.handleEditCardTitleClick}
          title={this.state.title}
          editingTitle={this.state.visibleForm}
        ></CardModal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardModalContainer);
