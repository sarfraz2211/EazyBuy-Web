import React from "react";

interface AuthInputProps {
type?: string;
placeholder: string;
}

export default function AuthInput({
type = "text",
placeholder,
}: AuthInputProps) {
return ( <input
   type={type}
   placeholder={placeholder}
   className="auth-input"
 />
);
}
