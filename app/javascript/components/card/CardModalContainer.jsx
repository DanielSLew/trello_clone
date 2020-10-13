import React from "react";
import { connect } from "react-redux";
import CardModal from "./CardModal";
import * as cardActions from "../../actions/CardActions";
import * as boardActions from "../../actions/BoardActions";

const mapStateToProps = (state, ownProps) => {
  return {
    card:
      state.cards.find((card) => {
        return card.id === +ownProps.match.params.id;
      }) || {},
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
    title: "",
    description: "",
    archived: null,
    boardLoaded: false,
    editDescription: false,
  };

  componentDidMount() {
    this.props.onFetchCard();
  }

  componentDidUpdate() {
    if (this.props.card && !this.state.boardLoaded) {
      this.props.onFetchBoard(this.props.card.board_id);
      this.setState({
        boardLoaded: true,
        title: this.props.card.title,
        description: this.props.card.description || "",
        archived: this.props.card.archived,
      });
    }
  }

  handleTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleEditCardTitleClick = (e) => {
    console.log(this.state);
    this.setState({
      visibleForm: true,
    });
  };

  handleEditDescriptionClick = (e) => {
    this.setState({
      editDescription: true,
    });
  };

  handleCloseEditDescription = (e) => {
    this.setState({
      editDescription: false,
      description: this.props.card.description,
    });
  };

  handleUpdateCardSubmit = (e, options = {}) => {
    if (this.state.title.trim() === "") {
      this.setState({
        title: this.props.card.title,
      });
      return;
    }

    const archived =
      options.archived === undefined ? this.state.archived : options.archived;

    const updatedCard = {
      card: {
        title: this.state.title,
        description: this.state.description,
        archived,
      },
    };

    this.props.onSubmit(this.props.card.id, updatedCard, () => {
      this.setState({
        visibleForm: false,
        editDescription: false,
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
          handleEditDescriptionClick={this.handleEditDescriptionClick}
          handleCloseEditDescription={this.handleCloseEditDescription}
          state={this.state}
        ></CardModal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardModalContainer);
