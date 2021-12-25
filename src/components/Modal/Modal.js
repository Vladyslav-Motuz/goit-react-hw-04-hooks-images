import React from 'react';
import { useEffect } from "react";
import { createPortal } from 'react-dom';
import s from './Modal.module.css'

const modalroot = document.querySelector('#modal-root');

function Modal({ modalImage, modalImageText, onClose }) {

  useEffect(() => {
		window.addEventListener("keydown", handleEscClose);

		return () => {
			window.removeEventListener("keydown", handleEscClose);
		};
  });
  
  const handleEscClose = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
      <div className={s.Overlay} onClick={handleOverlayClick}>
        <div className={s.Modal}>
          <img src={modalImage} alt={modalImageText} />
        </div>
      </div>,
      modalroot,
    );
}
export default Modal;