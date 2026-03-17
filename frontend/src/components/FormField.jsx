import React from "react";

const FormField = ({
  as = "input",
  label,
  helpText,
  className = "",
  ...props
}) => {
  const Component = as;
  const fieldClassName = as === "textarea" ? "textarea" : "input";

  return (
    <label className="field">
      {label ? <span className="field__label">{label}</span> : null}
      <Component className={`${fieldClassName} ${className}`.trim()} {...props} />
      {helpText ? <p className="field__help">{helpText}</p> : null}
    </label>
  );
};

export default FormField;
