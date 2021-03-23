import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateExercises() {
  let exerciseObj = {
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
  };

  const userObj = {
    users: ["Test User"],
    username: "Test User",
  };

  const [exerciseModel, setExercise] = useState(exerciseObj);
  const [user, setUser] = useState(userObj);
  const refUserInput = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:7000/users/").then((res) => {
      if (res.data.length > 0) {
        setUser({
          ...user,
          users: res.data.map((user) => user.username),
          username: res.data[0].username,
        });
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: exerciseModel.username,
      description: exerciseModel.description,
      duration: exerciseModel.duration,
      date: exerciseModel.date,
    };

    console.log(exercise);
    axios.post("http://localhost:7000/exercises/add", exercise);
    window.location = "/";
  };

  return (
    <>
      <h3>Create New Exercise log</h3>
      <br />
      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6 form-group">
            <label htmlFor="username">UserName </label>
            <select
              className="form-control"
              ref={refUserInput}
              value="exerciseModel.username"
              type="text"
              id="username"
              name="username"
              value={exerciseModel.username}
              onChange={(e) => {
                setExercise({ ...exerciseModel, username: e.target.value });
              }}
            >
              <option>Select User</option>
              {user.users.map((eachUser) => {
                return (
                  <option key={eachUser} value={eachUser}>
                    {eachUser}
                  </option>
                );
              })}
            </select>
          </div>
          <div className=" col-6 form-group">
            <label htmlFor="description">Description </label>
            <input
              className="form-control"
              type="text"
              id="description"
              name="description"
              value={exerciseModel.description}
              onChange={(e) =>
                setExercise({ ...exerciseModel, description: e.target.value })
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6 form-group">
            <label htmlFor="duration">Duration (in minutes) </label>
            <input
              className="form-control"
              type="text"
              id="duration"
              name="duration"
              value={exerciseModel.duration}
              onChange={(e) =>
                setExercise({ ...exerciseModel, duration: e.target.value })
              }
            />
          </div>
          <div className="col-6 form-group">
            <label htmlFor="date">Date </label>
            <div>
              <DatePicker
                className="form-control"
                selected={exerciseModel.date}
                onChange={(e) => {
                  setExercise({ ...exerciseModel, date: e });
                }}
              />
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Create Exercise Log"
          className="btn btn-primary"
        />
      </form>
    </>
  );
}

export default CreateExercises;
