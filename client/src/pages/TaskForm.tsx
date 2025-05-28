import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { ITask, TaskStatus } from "../interfaces/ITask";
import api from "../utils/axios";

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = !!id;

  const [task, setTask] = useState<Partial<ITask>>({
    title: "",
    description: "",
    status: "To-Do",
    dueDate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      await api.put(`/tasks/${id}`, task);
    } else {
      await api.post("/tasks", task);
    }
    navigate("/dashboard");
  };

  useEffect(() => {
    if (isEdit) {
      api.get(`/tasks/${id}`).then((res) => setTask(res.data));
    }
  }, [id, isEdit]);

  return (
    <main>
      <h2>{isEdit ? "Edit Task" : "New Task"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            placeholder="Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />
        </label>

        <label>
          Description
          <textarea
            placeholder="Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </label>

        <label>
          Status
          <select
            value={task.status}
            onChange={(e) =>
              setTask({ ...task, status: e.target.value as TaskStatus })
            }
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </label>

        <label>
          Due Date
          <input
            type="date"
            value={task.dueDate?.slice(0, 10) || ""}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            required
          />
        </label>

        <Link to="/dashboard">Back</Link>
        <button type="submit">{isEdit ? "Update" : "Create"}</button>
      </form>
    </main>
  );
};

export default TaskForm;
