import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { postCreateUser } from "../services/UserService";
import { toast } from "react-toastify";

function ModalAddNew(props) {
  const { isShowModalAddNew, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);

    //check res axios.post
    if (res && res.id) {
      //success
      handleClose();
      setName("");
      setJob("");
      toast.success("Add success");
      handleUpdateTable({ first_name: name, id: res.id });
    } else {
      toast.error("Add error");
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial", color: "black" }}
    >
      <Modal
        show={isShowModalAddNew}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <form>
              <div class="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Job</label>
                <input
                  type="text"
                  className="form-control"
                  value={job}
                  onChange={(event) => {
                    setJob(event.target.value);
                  }}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSaveUser();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>{" "}
    </div>
  );
}

export default ModalAddNew;
