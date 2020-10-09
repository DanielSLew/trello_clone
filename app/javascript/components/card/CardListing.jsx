import React from 'react';
import { Link } from 'react-router-dom'

const CardListing = ({ cards }) => {
  const listId = cards[0] && cards[0].list_id;

  const cardItems = cards.map(card => {
    return (
      <div className="card-background" key={card.id}>
        <Link to={`/cards/${card.id}`}>
          <div className="card">
            <i className="edit-toggle edit-icon sm-icon"></i>
            <div className="card-info">
              {card.labels.map(label => <div className={`card-label ${label} colorblindable`} key={label}></div>)}
              <p>
                {card.title}
              </p>
            </div>
            <div className="card-icons">
              {card.due_date && <i className="clock-icon sm-icon overdue-recent completed">{card.due_date}</i>}
              {card.description && <i className="description-icon sm-icon"></i>}
              {card.comments_count && <i className="comment-icon sm-icon"></i>}
            </div>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div id="cards-container" data-id={`list-${listId}-cards`}>
      {cardItems}
    </div>
  );
};

export default CardListing;
