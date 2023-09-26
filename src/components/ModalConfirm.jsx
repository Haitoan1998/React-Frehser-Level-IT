import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { DeleteUser } from "../services/UserService";
import { toast } from "react-toastify";

function ModalConfirm(props) {
  const {
    isShowModalDelete,
    handleClose,
    dataUserDelete,
    handelDeleteUserFromModal,
  } = props;

  const confirmDelete = async () => {
    let res = await DeleteUser(dataUserDelete.id);
    if (res && res.statusCode === 204) {
      handleClose();
      handelDeleteUserFromModal(dataUserDelete);
      toast.success("Delete success");
    } else {
      toast.error("Delete error");
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial", color: "black" }}
    >
      <Modal
        show={isShowModalDelete}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            do you want delete user: {dataUserDelete.email}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              confirmDelete();
            }}
          >
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>{" "}
    </div>
  );
}

export default ModalConfirm;
