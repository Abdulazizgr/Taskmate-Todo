import { useState } from "react";

const AddTask = ({ tasklist, setTasklist, task, setTask }) => {
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const taskName = e.target.task.value.trim();
    if (!taskName) {
      setError("Task name cannot be empty");
      return;
    }
    if (taskName.length > 25) {
      setError("Task name cannot exceed 25 characters");
      return;
    }

    setError("");

    if (task.id) {
      // Update existing task
      const date = new Date();
      const updatedTasklist = tasklist.map((todo) =>
        todo.id === task.id
          ? {
              id: task.id,
              name: taskName,
              time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
              status: task.status, // Preserve status
            }
          : todo
      );
      setTasklist(updatedTasklist);
      setTask({});
    } else {
      // Add new task
      const date = new Date();
      const newTask = {
        id: date.getTime(),
        name: taskName,
        time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
        status: "pending", // Default status
      };
      setTasklist([...tasklist, newTask]);
      setTask({});
    }
  };

  return (
    <section className="addTask">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="task"
            value={task.name || ""}
            autoComplete="off"
            placeholder="Add task"
            maxLength="25"
            onChange={(e) => setTask({ ...task, name: e.target.value })}
          />
          {error && <p className="error">{error}</p>}
        </div>
        <button type="submit">{task.id ? "Update" : "Add"}</button>
      </form>
    </section>
  );
};

export default AddTask;
