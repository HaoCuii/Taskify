import { closestCorners, DndContext } from "@dnd-kit/core";
import { useState } from "react";
import Column from "./components/Column"; 
import { arrayMove } from "@dnd-kit/sortable";
import CreateTask from "./components/CreateTask";

const Board = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Add text to homepage" },
    { id: 2, title: "Fix styling in about section" },
    { id: 3, title: "Learn how to center a div" },
  ]);

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  // Function to add a task (this will be passed to CreateTask)
  const addTask = (taskContent) => {
    const newTask = {
      id: tasks.length + 1, // Generating a new ID based on the current task length
      title: taskContent
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl mt-10">Task Board</h1>
      {/* Pass addTask as a prop to CreateTask */}
      <CreateTask addTask={addTask} />

        <div className="flex justify-center items-center w-full gap-8 mt-10">
          <DndContext
            onDragEnd={handleDragEnd}collisionDetection={closestCorners}className="flex-1 max-w-sm">
            <Column tasks={tasks} />
          </DndContext>

          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
            className="flex-1 max-w-sm">
            <Column tasks={tasks} />
          </DndContext>
        </div>

    </div>
  );
};

export default Board;
