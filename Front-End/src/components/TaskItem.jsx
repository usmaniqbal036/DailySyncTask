const statusClass = {
  Pending: "status-pending",
  InComplete: "status-progress",
  Complete: "status-completed",
};

const statusLabel = {
  Pending: "Pending",
  InComplete: "In Progress",
  Complete: "Completed",
};

const TaskItem = ({ task, onEdit, onDelete }) => (
  <div className="task-card">
    <div className="task-card-header">
      <h3>{task.title}</h3>
      <span className={`status-badge ${statusClass[task.status]}`}>
        {statusLabel[task.status] || task.status}
      </span>
    </div>
    {task.description && <p className="task-description">{task.description}</p>}
    <div className="task-actions">
      <button className="btn-edit" onClick={() => onEdit(task)}>Edit</button>
      <button className="btn-delete" onClick={() => onDelete(task)}>Delete</button>
    </div>
  </div>
);

export default TaskItem;