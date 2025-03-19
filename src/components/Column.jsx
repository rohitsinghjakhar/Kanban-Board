import React from "react";
import { useDrop } from "react-dnd";
import Task from "./Task";
import { Paper, Typography } from "@mui/material";

const columnColors = {
  "To Do": "#FFEBEE",
  "In Progress": "#FFF3E0",
  "Peer Review": "#E3F2FD",
  Done: "#E8F5E9",
};

const Column = ({ title, tasks }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => item.moveTask(item.id, title),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Paper
      ref={drop}
      sx={{
        p: 2,
        height: "500px", // Ensure a fixed height for consistency
        backgroundColor: isOver ? "#e3f2fd" : columnColors[title],
        borderRadius: 2,
        boxShadow: 3,
        overflowY: "auto", // Scroll when tasks exceed height
        transition: "0.3s ease",
        "&:hover": { backgroundColor: "#f0f0f0" },
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}
      >
        {title}
      </Typography>
      {tasks
        .filter((task) => task.status === title)
        .map((task) => (
          <Task key={task.id} task={task} />
        ))}
    </Paper>
  );
};

export default Column;
