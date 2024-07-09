import React, { useState } from "react";
import "./todo.css";
import { CiEdit, CiSaveDown2 } from "react-icons/ci";
import { MdDeleteForever, MdMoveDown, MdMoveUp } from "react-icons/md";
import { IoAdd } from "react-icons/io5";

const Todo = () => {
  const [tasks, setTasks] = useState([]); // State for storing the list of tasks
  const [newTask, setNewTask] = useState(""); // State for storing the value of the new task input
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTask, setEditingTask] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };
  const handleAdd = () => {
    const trimmedTask = newTask.trim();
    if (trimmedTask === "") {
      setError("Task cannot be empty");
      return;
    }
    if (tasks.includes(trimmedTask)) {
      setError("Task already exists");
      return;
    }
    setTasks((t) => [...t, trimmedTask]);
    setNewTask("");
    setError("");
  };

  const handleDelete = (index) => {
    const updateTasks = tasks.filter((_, i) => i !== index);
    setTasks(updateTasks);
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditingTask(tasks[index]);
  };
  const handleEditChange = (e) => {
    setEditingTask(e.target.value);
  };
  const handleEditSubmit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editingTask.trim();
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingTask("");
  };

  const moveTaskUp = (index) => {
    if (index > 0) {
      const updateTasks = [...tasks];
      [updateTasks[index], updateTasks[index - 1]] = [
        updateTasks[index - 1],
        updateTasks[index],
      ];
      setTasks(updateTasks);
    }
  };
  const moveTaskDown = (index) => {
    if (index > tasks.length - 1) {
      const updateTasks = [...tasks];
      [updateTasks[index], updateTasks[index + 1]] = [
        updateTasks[index + 1],
        updateTasks[index],
      ];
      setTasks(updateTasks);
    }
  };
  return (
    <div className="todoContainer">
      <h2 className="centerAlign">Add Todo List</h2>
      <div className="inputAddBtn">
        <input
          type="text"
          placeholder="Enter Task"
          value={newTask}
          onChange={handleInputChange}
          autoFocus
        />
        <button className="addButton" title="Add Task" onClick={handleAdd}>
          <IoAdd className="icons" />
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingTask}
                  onChange={handleEditChange}
                  autoFocus
                />
                <button
                  className="saveButton"
                  title="Save Task"
                  onClick={() => handleEditSubmit(index)}
                >
                  <CiSaveDown2 className="icons" />
                </button>
              </>
            ) : (
              <div className="taskButtonContainer">
                <span>{task}</span>
                <div className="buttonContainer">
                  <button
                    className="deleteButton"
                    title="Delete Task"
                    onClick={() => handleDelete(index)}
                  >
                    <MdDeleteForever className="icons" />
                  </button>
                  <button
                    className="editButton"
                    title="Edit Task"
                    onClick={() => handleEditClick(index)}
                  >
                    <CiEdit className="icons" />
                  </button>
                  <button
                    className="moveButton"
                    title="Move Task Up"
                    onClick={() => moveTaskUp(index)}
                  >
                    <MdMoveUp className="icons" />
                  </button>
                  <button
                    className="moveButton"
                    title="Move Task Down"
                    onClick={() => moveTaskDown(index)}
                  >
                    <MdMoveDown className="icons" />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
