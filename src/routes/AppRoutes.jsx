import { Routes, Route } from "react-router";
import { useState, useRef } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import { Container } from "react-bootstrap";
import Login from "../components/Login";
import Home from "../components/Home";
import TableUsers from "../components/TableUsers";
import { toast } from "react-toastify";
import Papa from "papaparse";

import React from "react";
import PrivateRoutes from "./PrivateRoutes";
import NotFound from "../components/NotFound";

export default function AppRoutes() {
  const [dataExport, setDataExport] = useState([]);
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [data, setData] = useState([]);

  const GetData = (data) => {
    setData(data);
  };

  const HIHI = useRef();

  const handleImport = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      //check xem file có đúng định dạng
      if (file.type !== "text/csv") {
        toast.error("sai định dạng, chỉ được up file csv");
        return;
      }
      Papa.parse(file, {
        // header: true,
        complete: function (results) {
          let result = [];
          const rawCSV = results.data;
          //check xem có mảng data ko
          if (rawCSV.length > 0) {
            //check xem có header theo yêu cầu ko
            if (rawCSV[0] && rawCSV[0].length === 3) {
              //check xem header có đúng theo yêu cầu
              if (
                rawCSV[0][0] !== "Email" ||
                rawCSV[0][1] !== "First Name" ||
                rawCSV[0][2] !== "Last Name"
              ) {
                toast.error("wrong format header CSV file");
              } else {
                rawCSV.map((item, index) => {
                  //check xem từng phần tử có đúng theo yêu cầu
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.email = item[0];
                    obj.first_name = item[1];
                    obj.last_name = item[2];
                    result.push(obj);
                  }
                });
                setData(result);
                setIsShowModalImport(!isShowModalImport);
              }
            } else {
              toast.error("wrong format CSV file");
            }
          }
          setData(result);
          if (result && result.length > 0) {
            HIHI.current.setData();
          }
        },
      });
    }
  };
  function getUsersExport() {
    let result = [];
    if (data && data.length > 0) {
      result.push(["Id", "Email", "First Name", "Last Name"]);
      data.map((item) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <PrivateRoutes>
              <Container>
                <div className="my-3 add-new">
                  <b>List Users:</b>
                  <div>
                    <button className="btn btn-warning">
                      <label htmlFor="import">Import</label>
                    </button>

                    <input
                      id="import"
                      type="file"
                      multiple
                      className="d-none"
                      onChange={(event) => {
                        handleImport(event);
                      }}
                    />
                    <CSVLink
                      data={dataExport}
                      filename={"my-file.csv"}
                      className="btn btn-primary mx-3"
                      target="_blank"
                      asyncOnClick={true}
                      onClick={getUsersExport}
                    >
                      Export
                    </CSVLink>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        setIsShowModalAddNew(!isShowModalAddNew);
                      }}
                    >
                      Add new users
                    </button>
                  </div>
                </div>
                <TableUsers
                  ref={HIHI}
                  isShowModalAddNew={isShowModalAddNew}
                  setIsShowModalAddNew={setIsShowModalAddNew}
                  GetData={GetData}
                  data={data}
                />
              </Container>
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
