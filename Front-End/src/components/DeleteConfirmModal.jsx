import Modal from "./Modal";
import { deleteTask } from "../services/taskService";

const DeleteConfirmModal = ({ isOpen, onClose, task, onDeleted }) => {
  // 1. Guard clause: If there is no task, don't try to render the modal content
  if (!task) return null;

  const handleDelete = async () => {
    // 2. Extra safety: ensure task._id exists before calling the service
    if (task?._id) {
      await deleteTask(task._id);
      onDeleted();
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Task">
      <p>Are you sure you want to delete "<strong>{task.title}</strong>"? This cannot be undone.</p>
      <div className="modal-actions">
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </Modal>
  );
}

export default DeleteConfirmModal;