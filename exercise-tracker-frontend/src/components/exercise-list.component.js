import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link className="btn btn-primary" to={"/edit/" + props.exercise._id}>Edit</Link> |{" "}
      <button
        className="btn btn-primary"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

function ExerciseList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7000/exercises/")
      .then((res) => {
        if (res.data.length > 0) {
          setExercises(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteExercise = function (id) {
    axios
      .delete("http://localhost:7000/exercises/" + id)
      .then((res) => console.log(res.data));

    setExercises(exercises.filter((el) => el._id !== id));
  };

  const exerciselist = function () {
    return exercises.map((currentExercise) => {
      console.log(exercises);
      return (
        <Exercise
          exercise={currentExercise}
          deleteExercise={deleteExercise}
          key={currentExercise._id}
        />
      );
    });
  };

  return (
    <div>
      <h2>Logged Exercises</h2>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciselist()}</tbody>
      </table>
    </div>
  );
}

export default ExerciseList;
