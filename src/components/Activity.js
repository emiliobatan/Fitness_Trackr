import React from "react";

const Activity = ({ children, activity }) => {
  return activity ? (
    <>
      <div>
        <h3>Name: {activity.name}</h3>
        <div>Description: {activity.description}</div>
      </div>
      {children}
    </>
  ) : null;
};

export default Activity;