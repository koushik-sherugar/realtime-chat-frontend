import axios from "axios";

export const addTask = async (userId, title, description) => {
  try {
    const newTask = {
      userId,
      title,
      description,
      createdAT: new Date().toISOString(),
    };

    const response = await axios.post(
      `${process.env.REACT_APP_SERVERURL}/task/create-task`,
      newTask
    );

    return response.data; // Returning the newly created task
  } catch (error) {
    console.error("Error adding task:", error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
};

// Edit task
export const editTask = async (userId, taskId, taskData) => {
  console.log("userId, taskId, taskData ----->", userId, taskId, taskData);
  try {
    // Prepare the updated task object including the userId and the new task data
    const updatedTask = {
      userId,
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
    };

    // Make the PUT request to update the task in the backend
    const response = await axios.put(
      `${process.env.REACT_APP_SERVERURL}/task/update-task/${taskId}`,
      updatedTask
    );

    return response.data; // Returning the updated task
  } catch (error) {
    console.error("Error editing task:", error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
};

// //   Delete Task

export const deleteTask = async (userId, taskId) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVERURL}/task/delete-task/${taskId}`,
      {
        data: { userId: userId }, // Sending userId in the request body
      }
    );

    return response.data; // Returning the response message
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
};

// get all the tasks
export const getTasks = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVERURL}/task/get-tasks?userId=${userId}`
    );

    return response.data; // Returning the array of tasks
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
};
