import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import type { ITask, TaskStatus } from "../interfaces/ITask";
import api from "../utils/axios";

const Dashboard = () => {
  const { clearToken } = useAuthStore();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filter, setFilter] = useState<TaskStatus | "All">("All");
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const logout = () => {
    clearToken();
    navigate("/signin");
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    setSubmitting(true);

    try {
      await api.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTaskDelete = async (id: string) => {
    setSubmitting(true);

    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((t) => t.status === filter);

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main>
      <h1>Dashboard</h1>
      <button onClick={() => navigate("/task/new")}>+ New Task</button>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value as TaskStatus | "All")}
      >
        <option value="All">All</option>
        <option value="To-Do">To-Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      {loading ? (
        <p>Getting your tasks, please wait...</p>
      ) : (
        <>
          {tasks.length === 0 ? (
            <p>
              You don't have any tasks at the moment, consider adding new ones
            </p>
          ) : (
            <ul>
              {filteredTasks.map((task) => (
                <li key={task._id}>
                  <h3>{task.title}</h3>
                  <p>{task.description ?? "No Description Available"}</p>
                  <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                  <select
                    disabled={submitting}
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task._id, e.target.value as TaskStatus)
                    }
                  >
                    <option value="To-Do">To-Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                  <button onClick={() => navigate(`/task/edit/${task._id}`)}>
                    Edit
                  </button>
                  <button
                    disabled={submitting}
                    onClick={() => handleTaskDelete(task._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      <button onClick={logout}>Logout</button>
    </main>
  );
};

export default Dashboard;
