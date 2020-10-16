import React from "react";
import Comment from "./Comment";
import Action from "./Action";

const ActivityList = ({ comments = [], actions = [] }) => {
  const activities = [...comments, ...actions].sort((a, b) => {
    const date1 = new Date(a.updated_at);
    const date2 = new Date(b.updated_at);

    if (date1 > date2) {
      return -1;
    } else if (date1 < date2) {
      return 1;
    } else {
      return 0;
    }
  });

  const activityItems = activities.map((activity) => {
    if (activity.text) {
      return <Comment key={`comment-${activity.id}`} commentData={activity} />;
    } else {
      return <Action key={`action-${activity.id}`} actionData={activity} />;
    }
  });

  return (
    <li className="activity-section">
      <h2 className="activity-icon icon">Activity</h2>
      <ul className="horiz-list">
        <li className="not-implemented">Show Details</li>
      </ul>
      <ul className="modal-activity-list">{activityItems}</ul>
    </li>
  );
};

export default ActivityList;
