import React from 'react';

const CardListing = ({ cards }) => {
  const listId = cards[0] && cards[0].list_id;

  const cardItems = cards.map(card => {

    return (
      <div className="card-background" key={card.id}>
        <div className="card ">
          <i className="edit-toggle edit-icon sm-icon"></i>
          <div className="card-info">
            {card.labels.map(label => <div className={`card-label ${label} colorblindable`} key={label}></div>)}
            <p>
              {card.title}
            </p>
          </div>
          <div className="card-icons">
            <i className="clock-icon sm-icon overdue-recent completed">Aug 4</i>
            <i className="description-icon sm-icon"></i>
            <i className="comment-icon sm-icon"></i>
          </div>
        </div>
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
