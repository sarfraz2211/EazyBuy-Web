"use client";

interface ToastProps {
  message: string;
  type?: "success" | "error";
}

export default function Toast({
  message,
  type = "success",
}: ToastProps) {

  if (!message) return null;

  return (
    <div
      className={
        type === "success"
          ? "toast-success"
          : "toast-error"
      }
    >
      {message}
    </div>
  );
}