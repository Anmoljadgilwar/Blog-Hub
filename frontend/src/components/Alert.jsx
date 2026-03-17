import React from "react";

const Alert = ({ message, variant = "error" }) => {
  if (!message) {
    return null;
  }

  return <div className={`alert alert-${variant}`}>{message}</div>;
};

export default Alert;
