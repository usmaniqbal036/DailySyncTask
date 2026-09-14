import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return <p className="empty-message">No tasks yet — click "Add Task" to create your first one!</p>;
  }

  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;