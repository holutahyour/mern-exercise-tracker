import React, { useState } from "react";
import axios from 'axios'

function CreateUser() {
  const userObj = {
    username: "",
  };

  const [userModel, setUserModel] = useState(userObj);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserModel({ ...userModel, username: "" });
    console.log(userModel);

    axios.post('http://localhost:7000/users/add',userModel)
    .then(res => console.log(res.data))
  };

  return (
    <div>
      <h3>Create A New User </h3>
      <br />
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            type="text"
            value={userModel.username}
            id="username"
            name="username"
            onChange={(e) => {
              setUserModel({ ...userModel, username: e.target.value });
            }}
          />
        </div>
        <input
          type="submit"
          value="Create New User"
          className="btn btn-primary"
        />
      </form>
    </div>
  );
}

export default CreateUser;
