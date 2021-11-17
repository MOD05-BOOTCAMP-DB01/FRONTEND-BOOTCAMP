import React, { useState } from "react";
import Modal from "./Modal";
import { FcInfo } from "react-icons/fc";

function ModalAcess({ children }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <div>
      <button onClick={() => setIsModalVisible(true)}>
        <FcInfo />
      </button>
      {isModalVisible ? (
        <Modal onClose={() => setIsModalVisible(false)}>{children}</Modal>
      ) : null}
    </div>
  );
}
export default ModalAcess;
