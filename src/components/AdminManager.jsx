import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import { Server_URL } from "./Urls";
import {
  Table,
  Container,
  ButtonGroup,
  Button,
  Modal,
  Form,
  InputGroup,
  Toast,
  FormControl,
} from "react-bootstrap";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

const AdminManager = () => {
  const [newUser, setNewUser] = useState();
  const [item, setItem] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const [error, setError] = useState(null);
  const [formShow, setFormShow] = useState(false);
  const [currentuser, setCurrentUser] = useState(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let name = document.getElementById("username").innerHTML;
    let pass = document.getElementById("password").innerHTML;
    console.log(name + " " + pass);
    const options = facade.makeOptions("PUT", true, newUser);
    fetch(Server_URL + "/api/info/admin/edituser", options).then((res) =>
      handleHttpErrors(res)
    );
    setCurrentUser(null);
  };

  const handleonChange = (evt) => {
    setNewUser({ ...newUser, [evt.target.id]: evt.target.value });

    console.log(newUser);
  };

  const handleDelete = (evt) => {
    evt.preventDefault();
    let username = evt.target.value;
    const options = facade.makeOptions("DELETE", true, newUser);
    fetch(Server_URL + "/api/info/admin/deleteuser/" + username, options).then(
      (res) => handleHttpErrors(res)
    );
    setDataReady(false);
  };

  const handleEdit = (evt) => {
    evt.preventDefault();
    setCurrentUser(evt.target.value);
    setFormShow(true);
  };

  function getdata() {
    if (!dataReady) {
      const options = facade.makeOptions("GET", true);
      fetch(Server_URL + "/api/info/admin/users", options)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((result) => {
          setItem(result);
          console.log(item);
          setDataReady(true);
        })
        .catch((error) => {
          setError(error);
          setDataReady(false);
        });
    }
  }

  if (dataReady) {
    return (
      <div>
        <Form onSubmit={handleSubmit} onChange={handleonChange}>
          <Form.Group className="mb-3" id="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder={currentuser} disabled />
          </Form.Group>
          <Form.Group className="mb-3" id="password">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Change User Details
          </Button>
        </Form>
        {JSON.stringify(newUser)}
        <Container className="text-center">
          <br />
          <h3>User List</h3>
          <hr />
          <br />
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {item.map((user, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{user.username}</td>
                  <td>
                    <ButtonGroup>
                      <Button
                        value={user.username}
                        variant="success"
                        onClick={handleEdit}
                      >
                        Edit
                      </Button>
                      <Button
                        value={user.username}
                        variant="danger"
                        onClick={handleDelete}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  } else if (error) {
    return { error };
  } else {
    return <div>Loading...{getdata()}</div>;
  }
};

export default AdminManager;
