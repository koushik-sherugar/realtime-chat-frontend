import React, { useState } from "react";
import Modal from "react-modal";
import { useUserAuth } from "../../context/AuthContext";
import { addTask } from "../../functions/taskFunctions";
import { ButtonsColoured } from "./Buttons";
import { userTasksRefreshStore } from "../../ZustandStores/TasksStore";

const AddTaskModal = ({ isModalOpen, closeModal }) => {
  const { user } = useUserAuth();
  const { userTasksRefresh, setUserTasksRefresh } = userTasksRefreshStore();

  // Local state
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle add task
  const handleAddTask = async () => {
    try {
      await addTask(user?.uid, taskData?.title, taskData?.description);
      setUserTasksRefresh(!userTasksRefresh);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
    closeModal();
  };
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Add Task"
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
      <h2>Add New Task</h2>
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
        className="p-1 border border-gray-300"
        style={{ marginTop: "10px", width: "100%", height: "80px" }}
      />

      <ButtonsColoured
        clickAction={() => handleAddTask()}
        title="Add Task"
        color="accentblue"
      />
      <button
        onClick={closeModal}
        style={{ marginTop: "20px", marginLeft: "10px" }}
      >
        Cancel
      </button>
    </Modal>
  );
};

export default AddTaskModal;
