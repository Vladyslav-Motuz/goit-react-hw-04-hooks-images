import { useState } from "react";
import s from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

function ImageGalleryItem({ source, description, id, dataOriginal}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => { setShowModal(!showModal) };
  return (
      <>
        <li
          key={id}
          className={s.ImageGalleryItem}
          onClick={toggleModal}
        >
          <img
            className={s.ImageGalleryItem__image}
            src={source}
            alt={description}            
          />
        </li>
        
        {showModal && (
          <Modal
            modalImage={dataOriginal}
            modalImageText={description}
            onClose={toggleModal}
          />
        )}
      </>
    );
};

export default ImageGalleryItem;