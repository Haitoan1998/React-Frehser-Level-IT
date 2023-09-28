import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../services/UserService";
import ModalAddNew from "./ModalAddNew";
import ReactPaginate from "react-paginate";
import ModalEditUsers from "./ModalEditUsers";
import _ from "lodash";
import { debounce } from "lodash";
import ModalConfirm from "./ModalConfirm";

const TableUsers = forwardRef(
  ({ setIsShowModalAddNew, isShowModalAddNew, GetData, data }, ref) => {
    const [listUsers, setListUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [dataUserDelete, setDataUserDelete] = useState({});
    const [newDataImport, setNewDataImport] = useState([]);

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    const handleSort = (sortBy, sortField) => {
      setSortBy(sortBy);
      setSortField(sortField);
      let clone = _.cloneDeep(listUsers);
      clone = _.orderBy(clone, [sortField], [sortBy]);
      console.log(clone);
      setListUsers(clone);
    };

    //ComponentDidMount Call API
    useEffect(() => {
      getAllUsers(currentPage);
      console.log("call api");
    }, [currentPage]);

    //Get all users
    const getAllUsers = async (page) => {
      let res = await fetchAllUsers(page);

      //Check res => ok
      if (res && res.data) {
        setListUsers(res.data);
        setTotalPages(res.total_pages);
        GetData(res.data);
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

    const handelDeleteUserFromModal = (user) => {
      const clone = _.cloneDeep(listUsers);

      const newUpdate = clone.filter((item, i) => {
        return item.id !== user.id;
      });

      setListUsers(newUpdate);
    };

    const handeEditUset = (user) => {
      setDataUserEdit(user);
      setIsShowModalEdit(!isShowModalAddNew);
    };

    const handleDelete = (user) => {
      setIsShowModalDelete(!isShowModalDelete);
      setDataUserDelete(user);
    };

    const HandleSearch = debounce((event) => {
      const term = event.target.value;
      console.log(1);
      if (term) {
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = cloneListUsers.filter((item) =>
          item.email.includes(term)
        );
        setListUsers(cloneListUsers);
      } else {
        getAllUsers(currentPage);
      }
    }, 500);

    useImperativeHandle(
      ref,
      () => ({
        setData() {},
      }),
      [data]
    );

    console.log("render");
    return (
      <>
        <div className="col-6 my-3">
          <input
            placeholder="Search by email..."
            onChange={(event) => {
              HandleSearch(event);
            }}
          />
        </div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>
                <div className="d-flex justify-content-around sort-header">
                  <span>ID</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => {
                        handleSort("desc", "id");
                      }}
                    ></i>{" "}
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => {
                        handleSort("asc", "id");
                      }}
                    ></i>
                  </span>
                </div>
              </th>
              <th>Email</th>
              <th>
                <div className="d-flex justify-content-around sort-header">
                  <span>First Name</span>
                  <span>
                    <i
                      class="fa-solid fa-arrow-down-long"
                      onClick={() => {
                        handleSort("desc", "first_name");
                      }}
                    ></i>{" "}
                    <i
                      class="fa-solid fa-arrow-up-long"
                      onClick={() => {
                        handleSort("asc", "first_name");
                      }}
                    ></i>
                  </span>
                </div>
              </th>
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
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDelete(item);
                        }}
                      >
                        Delete
                      </button>
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
        <ModalConfirm
          isShowModalDelete={isShowModalDelete}
          handleClose={() => {
            setIsShowModalDelete(!isShowModalDelete);
          }}
          dataUserDelete={dataUserDelete}
          handelDeleteUserFromModal={handelDeleteUserFromModal}
        />
      </>
    );
  }
);

export default TableUsers;
