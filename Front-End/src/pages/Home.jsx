import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import TaskFormModal from "../components/TaskFormModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { getTasks } from "../services/taskService";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formModal, setFormModal] = useState({ open: false, task: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, task: null });

  const loadTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialTasks = async () => {
      await loadTasks();
    };

    loadInitialTasks();
  }, []);

  return (
    <div className="home-page">
      <div className="home-header">
        <div>
          <h1>My Tasks</h1>
          <p className="subtitle">Add, edit, and track your tasks in one place</p>
        </div>
        <button className="btn-primary" onClick={() => setFormModal({ open: true, task: null })}>
          + Add Task
        </button>
      </div>

      {loading ? (
        <p className="loading-text">Loading tasks...</p>
      ) : error ? (
        <p className="form-error">{error}</p>
      ) : (
        <TaskList
          tasks={tasks}
          onEdit={(task) => setFormModal({ open: true, task })}
          onDelete={(task) => setDeleteModal({ open: true, task })}
        />
      )}

      <TaskFormModal
        key={`${formModal.open}-${formModal.task?._id ?? "new"}`}
        isOpen={formModal.open}
        editingTask={formModal.task}
        onClose={() => setFormModal({ open: false, task: null })}
        onSaved={loadTasks}
      />
      <DeleteConfirmModal
        isOpen={deleteModal.open}
        task={deleteModal.task}
        onClose={() => setDeleteModal({ open: false, task: null })}
        onDeleted={loadTasks}
      />
    </div>
  );
};

export default Home;