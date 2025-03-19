import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import Column from "./Column";
import AddTask from "./AddTask";
import { TextField, Container, Typography, Grid } from "@mui/material";

const KanbanBoard = () => {
  const { tasks } = useContext(TaskContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, textAlign: "center" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1565C0" }}
      >
        Kanban Task Board
      </Typography>
      <TextField
        label="Search Tasks"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{ mb: 2 }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Responsive Grid Layout for Columns */}
      <Grid container spacing={2}>
        {["To Do", "In Progress", "Peer Review", "Done"].map((stage) => (
          <Grid item xs={12} sm={6} md={3} key={stage}>
            <Column title={stage} tasks={filteredTasks} />
          </Grid>
        ))}
      </Grid>

      <AddTask />
    </Container>
  );
};

export default KanbanBoard;
