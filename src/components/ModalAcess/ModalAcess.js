import React, { useState } from "react";
import Modal from "./Modal";

function ModalAcess({ children }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <div>
      <button onClick={() => setIsModalVisible(true)}>open</button>
      {isModalVisible ? (
        <Modal onClose={() => setIsModalVisible(false)}>{children}</Modal>
      ) : null}
    </div>
  );
}
export default ModalAcess;
