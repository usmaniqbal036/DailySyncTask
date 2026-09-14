import { useState } from "react";
import Modal from "./Modal";
import { createTask, updateTask } from "../services/taskService";

const emptyForm = { title: "", description: "", status: "Pending" };

const TaskFormModal = ({ isOpen, onClose, editingTask, onSaved }) => {
  const isEditMode = Boolean(editingTask);
  const [form, setForm] = useState(() =>
    isEditMode ? { ...editingTask } : { ...emptyForm },
  );
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      if (isEditMode) {
        await updateTask(editingTask._id, form);
      } else {
        await createTask(form);
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Task" : "Add New Task"}>
      <form className="task-form" onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}

        <label>Title</label>
        <input type="text" name="title" value={form.title} onChange={handleChange} />

        <label>Description</label>
        <textarea name="description" rows={3} value={form.description} onChange={handleChange} />

        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="InComplete">In Progress</option>
          <option value="Complete">Completed</option>
        </select>

        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary">
            {isEditMode ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskFormModal;