import React, { useContext, useState } from "react";
import { useDrag } from "react-dnd";
import { TaskContext } from "../context/TaskContext";
import {
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const Task = ({ task }) => {
  const { updateTask, deleteTask, updateTaskStatus } = useContext(TaskContext);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id, moveTask: updateTaskStatus },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleEdit = () => {
    updateTask(task.id, title, description);
    setOpen(false);
  };

  return (
    <>
      <Paper
        ref={drag}
        sx={{
          p: 2,
          mb: 1,
          opacity: isDragging ? 0.5 : 1,
          backgroundColor: "#fff",
          cursor: "grab",
          borderRadius: 2,
          boxShadow: 2,
          transition: "0.3s ease",
          "&:hover": { boxShadow: 5, transform: "scale(1.03)" },
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {task.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {task.description}
        </Typography>
        <Button size="small" color="primary" onClick={() => setOpen(true)}>
          Edit
        </Button>
        <Button size="small" color="error" onClick={() => deleteTask(task.id)}>
          Delete
        </Button>
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleEdit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Task;
