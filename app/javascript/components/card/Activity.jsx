import React from "react";

const Action = ({ actionData }) => {
  return (
    <li>
      <div class="member-container">
        <div class="card-member small-size">VR</div>
      </div>
      <p>
        <span class="member-name">Victor Reyes</span> {actionData.description}{" "}
        <small>on {actionData.created_at} </small>
      </p>
    </li>
  );
};

export default Action;
