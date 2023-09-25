import { Container } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  return (
    <>
      <div className="app-container text-white">
        <Header />
        <Container>
          <div className="my-3 add-new">
            <b>List Users:</b>
            <button
              className="btn btn-success"
              onClick={() => {
                setIsShowModalAddNew(!isShowModalAddNew);
              }}
            >
              Add new users
            </button>
          </div>
          <TableUsers
            isShowModalAddNew={isShowModalAddNew}
            setIsShowModalAddNew={setIsShowModalAddNew}
          />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
