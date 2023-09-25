import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../services/UserService";
import ModalAddNew from "./ModalAddNew";
import ReactPaginate from "react-paginate";
import ModalEditUsers from "./ModalEditUsers";
import _ from "lodash";

const TableUsers = ({ setIsShowModalAddNew, isShowModalAddNew }) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

  //ComponentDidMount Call API
  useEffect(() => {
    getAllUsers(currentPage);
  }, [currentPage]);

  //Get all users
  const getAllUsers = async (page) => {
    let res = await fetchAllUsers(page);

    //Check res => ok
    if (res && res.data) {
      setListUsers(res.data);
      setTotalPages(res.total_pages);
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handelEditUserFromModal = (user) => {
    const clone = _.cloneDeep(listUsers);

    const newUpdate = clone.map((item, i) => {
      if (item.id === user.id) {
        item.first_name = user.first_name;
        return item;
      } else {
        return item;
      }
    });

    setListUsers(newUpdate);
  };

  const handeEditUset = (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(!isShowModalAddNew);
  };
  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => {
                        handeEditUset(item);
                      }}
                    >
                      Edit
                    </button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>{" "}
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      <ModalAddNew
        isShowModalAddNew={isShowModalAddNew}
        handleClose={() => {
          setIsShowModalAddNew(!isShowModalAddNew);
        }}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUsers
        isShowModalEdit={isShowModalEdit}
        handleClose={() => {
          setIsShowModalEdit(!isShowModalEdit);
        }}
        handelEditUserFromModal={handelEditUserFromModal}
        dataUserEdit={dataUserEdit}
      />
    </>
  );
};

export default TableUsers;
