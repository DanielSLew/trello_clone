import React from "react";
import { Link } from "react-router-dom";
import DueDate from "./DueDate";
import CommentSection from "./CommentSection";
import ActivityList from "./ActivityList";

const CardModal = ({
  card,
  comments,
  handleTextChange,
  handleUpdateCardSubmit,
  handleEditCardTitleClick,
  handleEditDescriptionClick,
  handleCloseEditDescription,
  handleDeleteClick,
  handleNewComment,
  toggleLabelPopover,
  toggleLabel,
  toggleDueDatePopover,
  updateDate,
  state,
}) => {
  const cardTitle = state.visibleForm ? state.title : card.title;
  const cardDescription = state.editDescription
    ? state.description
    : card.description;

  const archiveCard = (e) => {
    handleUpdateCardSubmit(e, { archived: true });
  };

  const unarchiveCard = (e) => {
    handleUpdateCardSubmit(e, { archived: false });
  };

  const onDeleteClick = (e) => {
    handleDeleteClick(card.id);
  };

  const handleLabelPopover = (e) => {
    e.preventDefault();
    toggleLabelPopover();
  };

  const labels = ["green", "yellow", "orange", "red", "purple", "blue"];

  const onLabelClick = (e) => {
    const label = labels[e.target.getAttribute("data-id")];
    console.log(label);
    toggleLabel(label);
  };

  return (
    <div id="modal-container">
      <div className="screen"></div>
      <div id="modal">
        <Link to={`/boards/${card.board_id}`}>
          <i className="x-icon icon close-modal"></i>
        </Link>
        {card.archived && (
          <div class="archived-banner">
            <i class="file-icon icon"></i>This card is archived.
          </div>
        )}
        <header>
          <i className="card-icon icon .close-modal"></i>
          <textarea
            name="title"
            className="list-title"
            style={{ height: "45px" }}
            defaultValue={cardTitle}
            onChange={handleTextChange}
            onBlur={handleUpdateCardSubmit}
            onClick={handleEditCardTitleClick}
          />
          <p>
            in list <a className="link">Stuff to try (this is a list)</a>
            <i className="sub-icon sm-icon"></i>
          </p>
        </header>
        <section className="modal-main">
          <ul className="modal-outer-list">
            <li className="details-section">
              <ul className="modal-details-list">
                <li className="labels-section">
                  <h3>Labels</h3>
                  {card.labels &&
                    card.labels.map((label) => {
                      return (
                        <div className="member-container">
                          <div
                            className={`${label} label colorblindable`}
                          ></div>
                        </div>
                      );
                    })}
                  <div
                    className="member-container"
                    onClick={handleLabelPopover}
                  >
                    <i className="plus-icon sm-icon"></i>
                  </div>
                </li>
                {state.labelsPopover && (
                  <div class="popover labels">
                    <div id="add-options-labels-dropdown">
                      <header>
                        <span>Labels</span>
                        <a
                          href="#"
                          class="icon-sm icon-close"
                          onClick={handleLabelPopover}
                        ></a>
                      </header>
                      <div class="content">
                        <input
                          class="dropdown-input"
                          placeholder="Search labels..."
                          type="text"
                        />
                        <div class="labels-search-results">
                          <ul class="label-list">
                            {labels.map((label, idx) => {
                              const checkedStatus = card.labels.includes(
                                label
                              ) ? (
                                <i class="check-icon sm-icon"></i>
                              ) : null;
                              return (
                                <li>
                                  <div
                                    onClick={onLabelClick}
                                    class={`${label} colorblindable`}
                                    data-id={idx}
                                  >
                                    {checkedStatus}
                                  </div>
                                  <div
                                    class={`label-background ${label}`}
                                  ></div>
                                  <div class="label-background-overlay"></div>
                                  <i class="edit-icon icon not-implemented"></i>
                                </li>
                              );
                            })}
                          </ul>
                          <ul class="light-list">
                            <li class="not-implemented">Create a new label</li>
                            <hr />
                            <li class="toggleColorblind">
                              Enable color blind friendly mode.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <li className="due-date-section">
                  <h3>Due Date</h3>
                  <div id="dueDateDisplay" className="overdue completed">
                    <input
                      id="dueDateCheckbox"
                      type="checkbox"
                      className="checkbox"
                      checked=""
                    />
                    {card.due_date}
                    <span>(past due)</span>
                  </div>
                </li>
              </ul>
              {state.dueDatePopover && (
                <DueDate
                  toggleDueDatePopover={toggleDueDatePopover}
                  dueDate={card.due_date}
                  updateDate={updateDate}
                />
              )}
              {!state.editDescription && (
                <form className="description">
                  <p>Description</p>
                  <span
                    onClick={handleEditDescriptionClick}
                    id="description-edit"
                    className="link"
                  >
                    Edit
                  </span>
                  <p className="textarea-overlay">{card.description}</p>
                  <p id="description-edit-options" className="hidden">
                    You have unsaved edits on this field.{" "}
                    <span className="link">View edits</span> -{" "}
                    <span className="link">Discard</span>
                  </p>
                </form>
              )}
              {state.editDescription && (
                <form className="description">
                  <p>Description</p>
                  <textarea
                    name="description"
                    class="textarea-toggle"
                    rows="1"
                    autofocus
                    defaultValue={cardDescription}
                    onChange={handleTextChange}
                  />
                  <div>
                    <div
                      className="button"
                      value="Save"
                      onClick={handleUpdateCardSubmit}
                    >
                      Save
                    </div>
                    <i
                      className="x-icon icon"
                      onClick={handleCloseEditDescription}
                    ></i>
                  </div>
                </form>
              )}
            </li>
            <CommentSection handleNewComment={handleNewComment} />
            <ActivityList comments={comments} actions={card.actions} />
          </ul>
        </section>
        <aside className="modal-buttons">
          <h2>Add</h2>
          <ul>
            <li className="member-button">
              <i className="person-icon sm-icon"></i>Members
            </li>
            <li className="label-button">
              <i className="label-icon sm-icon"></i>Labels
            </li>
            <li className="checklist-button">
              <i className="checklist-icon sm-icon"></i>Checklist
            </li>
            <li
              onClick={toggleDueDatePopover}
              className="date-button not-implemented"
            >
              <i className="clock-icon sm-icon"></i>Due Date
            </li>
            <li className="attachment-button not-implemented">
              <i className="attachment-icon sm-icon"></i>Attachment
            </li>
          </ul>
          <h2>Actions</h2>
          <ul>
            <li className="move-button">
              <i className="forward-icon sm-icon"></i>Move
            </li>
            <li className="copy-button">
              <i className="card-icon sm-icon"></i>Copy
            </li>
            <li className="subscribe-button">
              <i className="sub-icon sm-icon"></i>Subscribe
              <i className="check-icon sm-icon"></i>
            </li>
            <hr />
            {!card.archived && (
              <li onClick={archiveCard} className="archive-button">
                <i className="file-icon sm-icon "></i>
                Archive
              </li>
            )}
            {card.archived && (
              <>
                <li onClick={unarchiveCard} className="unarchive-button">
                  <i className="send-icon sm-icon"></i>Send to board
                </li>
                <li className="red-button" onClick={onDeleteClick}>
                  <i className="minus-icon sm-icon"></i>Delete
                </li>
              </>
            )}
          </ul>
          <ul className="light-list">
            <li className="not-implemented">Share and more...</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default CardModal;
