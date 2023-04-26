import React, { useState } from "react";
// import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const MyModal = (props) => {
  const { children, titleText } = props;

  return (
    <>
      <header className="text-center">
        <h1>
          <strong>Management</strong>
        </h1>
        <h2>
          <strong>System</strong>
        </h2>
      </header>

      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>{titleText}</Modal.Title>
          </Modal.Header>

          <Modal.Body>{children}</Modal.Body>
        </Modal.Dialog>
      </div>
    </>
  );
};
export default MyModal;
