import "./App.scss";
import Header from "./components/Header";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { handleRefresh } from "./redux/actions/UserAction";

function App() {
  const [isShowModalImport, setIsShowModalImport] = useState(false);

  // const { user, loginContext } = useContext(UserContext);

  const [data, setData] = useState([]);
  const dipatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // loginContext(
      //   localStorage.getItem("email"),
      //   localStorage.getItem("token")
      // );
      dipatch(handleRefresh());
    }
  }, []);

  return (
    <>
      <div
        className="modal show"
        style={{ display: "block", position: "initial", color: "black" }}
      >
        <Modal
          show={isShowModalImport}
          onHide={() => {
            setIsShowModalImport(!isShowModalImport);
          }}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>data import</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="body-add-new">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.length > 0 &&
                    data.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.email}</td>
                          <td>{item.first_name}</td>
                          <td>{item.last_name}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>{" "}
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div className="app-container text-white">
        <Header />
        <AppRoutes />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
