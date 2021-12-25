import React from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css'

const modalroot = document.querySelector('#modal-root');

class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscClose);
  }

  handleEscClose = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { modalImage, modalImageText } = this.props;
    return createPortal(
      <div className={s.Overlay} onClick={this.handleOverlayClick}>
        <div className={s.Modal}>
          <img src={modalImage} alt={modalImageText} />
        </div>
      </div>,
      modalroot,
    );
  }
};
export default Modal;