import React from "react";

/* Props */

interface AuthButtonProps {

  title: string;

  variant?: "primary" | "secondary";

  onClick?: () => void;
}

/* Reusable Button Component */

export default function AuthButton({

  title,

  variant = "primary",

  onClick,

}: AuthButtonProps) {

  return (

    <button
      onClick={onClick}

      className={
        variant === "primary"
          ? "auth-button-primary"
          : "auth-button-secondary"
      }
    >

      {title}

    </button>

  );
}