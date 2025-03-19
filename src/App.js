import React from "react";
import KanbanBoard from "./components/KanbanBoard";
import TaskProvider from "./context/TaskContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect"; // Detect if the user is on mobile

function App() {
    return (
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend} options={{ enableMouseEvents: true }}>
            <TaskProvider>
                <KanbanBoard />
            </TaskProvider>
        </DndProvider>
    );
}

export default App;
