import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import { putUpdateUser } from "../services/UserService";
import { toast } from "react-toastify";

function ModalEditUsers(props) {
  const {
    isShowModalEdit,
    handleClose,
    dataUserEdit,
    handelEditUserFromModal,
  } = props;

  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handeEditUser = async () => {
    let res = await putUpdateUser(name, job, dataUserEdit.id);

    if (res && res.updatedAt) {
      //success
      handleClose();
      toast.success("edit success");
      handelEditUserFromModal({ first_name: res.name, id: dataUserEdit.id });
    } else {
      console.log("alo");
      toast.error("Edit error");
    }
  };

  useEffect(() => {
    if (isShowModalEdit) {
      setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit]);

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial", color: "black" }}
    >
      <Modal
        show={isShowModalEdit}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit a user</Modal.Title>
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
              handeEditUser();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>{" "}
    </div>
  );
}

export default ModalEditUsers;
