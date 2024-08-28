import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { editTask } from "../../functions/taskFunctions";
import { useUserAuth } from "../../context/AuthContext";
import { userTasksRefreshStore } from "../../ZustandStores/TasksStore";
import { ButtonsColoured } from "./Buttons";

const EditTaskModal = ({ isModalOpen, closeModal, taskToEdit }) => {
  const { user } = useUserAuth();
  const { userTasksRefresh, setUserTasksRefresh } = userTasksRefreshStore();

  // Local state
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "To Do",
  });

  // Handle input change
  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle edit task
  const handleEditTask = async () => {
    try {
      // Call the editTask function to update the task in the backend
      await editTask(user?.uid, taskToEdit._id, taskData);
      setUserTasksRefresh(!userTasksRefresh);

      // Close the modal after saving changes
      closeModal();
    } catch (error) {
      console.error("Failed to edit task:", error);
    }
  };

  // Set the task data in the form fields when the taskToEdit prop changes
  useEffect(() => {
    if (taskToEdit) {
      setTaskData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status,
      });
    }
  }, [taskToEdit]);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Task"
      ariaHideApp={false}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          borderRadius: "10px",
          padding: "20px",
        },
      }}
    >
      <h2>Edit Task</h2>
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={taskData.title}
        onChange={handleChange}
        className="p-1 border border-gray-300"
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={taskData.description}
        onChange={handleChange}
        className="w-full h-20 p-1 mt-2 border border-gray-300"
      />
      <select
        name="status"
        value={taskData.status}
        onChange={handleChange}
        className="w-full p-1 mt-2 border border-gray-300"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <ButtonsColoured
        clickAction={() => handleEditTask()}
        title="Save Changes"
        color="accentblue"
      />
      <button onClick={closeModal} className="mt-5 ml-2">
        Cancel
      </button>
    </Modal>
  );
};

export default EditTaskModal;
