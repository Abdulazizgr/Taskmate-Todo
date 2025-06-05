const ShowTask = ({ tasklist, setTasklist, task, setTask }) => {
  const handleEdit = (id) => {
    const selectedTask = tasklist.find((todo) => todo.id === id);
    setTask(selectedTask);
  };

  const handleDelete = (id) => {
    const updatedTaskList = tasklist.filter((todo) => todo.id !== id);
    setTasklist(updatedTaskList);
  };

  const handleToggleStatus = (id) => {
    const updatedTasklist = tasklist.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            status: todo.status === "pending" ? "completed" : "pending",
          }
        : todo
    );
    setTasklist(updatedTasklist);
  };

  return (
    <section className="showTask">
      <div className="head">
        <div>
          <span className="title">Todo</span>
          <span className="count">{tasklist.length}</span>
        </div>
        <button className="clearAll" onClick={() => setTasklist([])}>
          Clear All
        </button>
      </div>
      <ul>
        {tasklist.map((todo) => (
          <li
            key={todo.id}
            className={todo.status === "completed" ? "completed" : ""}
          >
            <p>
              <span className="name">{todo.name}</span>
              <span className="time">{todo.time}</span>
              <span className="status">{todo.status}</span>
            </p>
            <i
              className="bi bi-pencil-square"
              onClick={() => handleEdit(todo.id)}
            ></i>
            <i
              className="bi bi-trash"
              onClick={() => handleDelete(todo.id)}
            ></i>
            <i
              className={`bi ${
                todo.status === "completed"
                  ? "bi-check-circle-fill"
                  : "bi-circle"
              }`}
              onClick={() => handleToggleStatus(todo.id)}
            ></i>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ShowTask;
