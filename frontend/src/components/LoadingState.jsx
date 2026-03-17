import React from "react";

const LoadingState = ({ message = "Loading..." }) => {
  return <div className="loading-state panel">{message}</div>;
};

export default LoadingState;
