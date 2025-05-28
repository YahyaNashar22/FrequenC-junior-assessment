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

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(3);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const logout = () => {
    clearToken();
    navigate("/signin");
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tasks", {
        params: { page, limit, search },
      });
      let fetchedTasks: ITask[] = res.data.tasks;

      if (filter !== "All") {
        fetchedTasks = fetchedTasks.filter((t) => t.status === filter);
      }

      setTasks(fetchedTasks);

      const totalTasks = res.data.total;
      setTotalPages(Math.ceil(totalTasks / limit));
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

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((t) => t.status === filter);

  useEffect(() => {
    fetchTasks();
  }, [page, search, filter]);

  return (
    <main>
      <div className="flex-between">
        <h1>Dashboard</h1>
        <button onClick={logout} className="mt-1 error">
          Logout
        </button>
      </div>

      <button onClick={() => navigate("/task/new")} className="success">
        + New Task
      </button>

      <label className="mt-2">
        Search
        <input
          type="text"
          placeholder="Search tasks by title..."
          value={search}
          onChange={onSearchChange}
        />
      </label>

      <label className="mt-1">
        Filter Status
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as TaskStatus | "All")}
        >
          <option value="All">All</option>
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </label>

      {loading ? (
        <p className="mt-2">Getting your tasks, please wait...</p>
      ) : (
        <>
          {tasks.length === 0 ? (
            <p className="mt-2">
              You don't have any tasks at the moment, consider adding new ones
            </p>
          ) : (
            <ul className="mt-2">
              {filteredTasks.map((task) => (
                <li key={task._id}>
                  <h3>{task.title}</h3>
                  <p>
                    {task.description === ""
                      ? "No Description Available"
                      : task.description}
                  </p>
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
                  <div className="flex">
                    <button
                      onClick={() => navigate(`/task/edit/${task._id}`)}
                      className="warning"
                    >
                      Edit
                    </button>
                    <button
                      disabled={submitting}
                      onClick={() => handleTaskDelete(task._id)}
                      className="error"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="pagination">
            <button
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages || loading}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default Dashboard;
