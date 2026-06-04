"use client";

interface ModalProps {

  open: boolean;

  title: string;

  message: string;

  onClose: () => void;
}

export default function CustomModal({

  open,
  title,
  message,
  onClose,

}: ModalProps) {

  if (!open) return null;

  return (

    <div className="modal-overlay">

      <div className="modal-content">

        <h2>{title}</h2>

        <p>{message}</p>

        <button
          onClick={onClose}
          className="auth-button-primary"
        >
          OK
        </button>

      </div>

    </div>
  );
}