import React from "react";
import { Link } from "react-router-dom";
import Alert from "@/components/Alert";

const AuthFormShell = ({
  title,
  subtitle,
  error,
  footerText,
  footerLinkLabel,
  footerLinkTo,
  children,
}) => {
  return (
    <section className="auth-layout">
      <div className="auth-card">
        <h1 className="auth-card__title">{title}</h1>
        {subtitle ? <p className="auth-card__subtitle">{subtitle}</p> : null}
        <Alert message={error} />
        {children}
        <p className="auth-card__footer">
          {footerText}{" "}
          <Link className="inline-link" to={footerLinkTo}>
            {footerLinkLabel}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AuthFormShell;
