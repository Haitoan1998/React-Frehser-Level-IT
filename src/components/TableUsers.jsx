import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../services/UserService";

const TableUsers = () => {
  const [listUsers, setListUsers] = useState([]);
  //ComponentDidMount Call API
  useEffect(() => {
    getAllUsers();
  }, []);

  //Get all users
  const getAllUsers = async () => {
    let res = await fetchAllUsers();

    //Check res => ok
    if (res && res.data && res.data.data) {
      setListUsers(res.data.data);
    }
  };

  console.log(listUsers);

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
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
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default TableUsers;
