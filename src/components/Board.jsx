import { closestCorners, DndContext } from "@dnd-kit/core";
import { useState } from "react";
import Column from "./Column"; // Assuming you have a Column component to render tasks
import { arrayMove } from "@dnd-kit/sortable";

const Board = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Add text to homepage" },
    { id: 2, title: "Fix styling in about section" },
    { id: 3, title: "Learn how to center a div" },
  ]);

  // Corrected the comparison logic here
  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Corrected the return typo
    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl mt-10">Drag And Drop</h1>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <Column tasks={tasks} />
      </DndContext>
    </div>
  );
};

export default Board;
