import React, { useState } from "react";
import facade from "../apiFacade";
import { Server_URL } from "./Urls";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

const AdminManager = () => {
  const [newUser, setNewUser] = useState();

  const handleChange = (evt) => {
    setNewUser({ ...newUser, [evt.target.id]: evt.target.value });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const options = facade.makeOptions("POST", true, newUser);
    fetch(Server_URL + "/api/info/admin/createUser", options).then((res) =>
      handleHttpErrors(res)
    );
  };

  return (
    <div>
      <form
        className="form-horizontal"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="username">
            Name:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="username"
              placeholder="Enter username"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="password">
            Password:
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="password"
              placeholder="Enter PassWord"
            />
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              style={{ marginLeft: 5 }}
              type="button"
              className="btn btn-dark"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <p>Please provide me with the ability to create new persons</p>
      <p>And update the backend when submitted</p>
      <p>{JSON.stringify(newUser)}</p>
    </div>
  );
};

export default AdminManager;
