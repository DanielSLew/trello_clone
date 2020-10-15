import React from "react";
import Comment from "./Comment";

const ActivityList = ({ comments, actions }) => {
  // const activities = [...comments, ...actions].sort((a, b));

  const commentComponents = comments.map((comment) => {
    return <Comment key={comment.id} commentData={comment} />;
  });

  // const activityComponents = actions.map((action) => {});

  return (
    <li className="activity-section">
      <h2 className="activity-icon icon">Activity</h2>
      <ul className="horiz-list">
        <li className="not-implemented">Show Details</li>
      </ul>
      <ul className="modal-activity-list">{commentComponents}</ul>
    </li>
  );
};

export default ActivityList;
