import React from "react";
import { connect } from "react-redux";
import CardModal from "./CardModal";
import * as cardActions from "../../actions/CardActions";
import * as boardActions from "../../actions/BoardActions";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  const card =
    state.cards.find((card) => {
      return card.id === +ownProps.match.params.id;
    }) || {};

  return {
    card: card,
    comments: state.comments || [],
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
    onDeleteCard: (id, callback) => {
      dispatch(cardActions.deleteCard(id));
      callback();
    },
    onCreateComment: (newComment, callback) => {
      dispatch(cardActions.createComment(newComment));
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
    labels: [],
    boardLoaded: false,
    editDescription: false,
    redirect: false,
    labelsPopover: false,
    dueDatePopover: false,
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
        labels: this.props.card.labels,
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

  handleDeleteClick = (id) => {
    this.props.onDeleteCard(id, () => {
      this.setState({ redirect: true });
    });
  };

  handleNewComment = (commentBody) => {
    const id = this.props.card.id;
    const newComment = {
      card_id: id,
      comment: { text: commentBody },
    };

    this.props.onCreateComment(newComment, () => {});
  };

  toggleLabelPopover = () => {
    this.setState((prevState) => {
      return { labelsPopover: !prevState.labelsPopover };
    });
  };

  toggleDueDatePopover = () => {
    this.setState((prevState) => {
      return { dueDatePopover: !prevState.dueDatePopover };
    });
  };

  toggleLabel = (label) => {
    let newLabels = this.props.card.labels.slice();
    if (newLabels.includes(label)) {
      newLabels = newLabels.filter((currLabel) => {
        return currLabel !== label;
      });
    } else {
      newLabels.push(label);
    }

    const updatedCard = {
      card: {
        labels: newLabels,
      },
    };
    this.props.onSubmit(this.props.card.id, updatedCard, () => {});
  };

  updateDate = (dueDate) => {
    const updatedCard = {
      card: {
        due_date: dueDate,
      },
    };
    this.props.onSubmit(this.props.card.id, updatedCard, () => {});
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/boards/${this.props.card.board_id}`} />;
    }

    return (
      <div>
        <CardModal
          card={this.props.card || {}}
          comments={this.props.comments}
          handleTextChange={this.handleTextChange}
          handleUpdateCardSubmit={this.handleUpdateCardSubmit}
          handleEditCardTitleClick={this.handleEditCardTitleClick}
          handleEditDescriptionClick={this.handleEditDescriptionClick}
          handleCloseEditDescription={this.handleCloseEditDescription}
          handleDeleteClick={this.handleDeleteClick}
          handleNewComment={this.handleNewComment}
          toggleLabelPopover={this.toggleLabelPopover}
          toggleLabel={this.toggleLabel}
          toggleDueDatePopover={this.toggleDueDatePopover}
          updateDate={this.updateDate}
          state={this.state}
        ></CardModal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardModalContainer);
