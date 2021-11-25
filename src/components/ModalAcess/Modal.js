import React from "react";
import "./Modal.css";

const Modal = ({ id = "modal", onClose = () => {}, children }) => {
  const handleOutsideClose = (e) => {
    if (e.target.id === id) onClose();
  };
  return (
    <div id={id} className="modal" onClick={handleOutsideClose}>
      <div className="modal__card">
        <button className="modal__card__close" onClick={onClose} />

        <div className="modal__card__cont">{children}</div>
      </div>
    </div>
  );
};
export default Modal;
