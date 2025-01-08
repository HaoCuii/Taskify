import React from "react"
import TaskCard from "./components/taskCard"
import { tasks as initialTasks, Status, statuses, Task } from "./components/utils/dataTasks"
import { useState } from "react"

const App = () => {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks)

  const columns = statuses.map((status) => {
    const tasksInColumn = tasks.filter((task) => task.status === status)
    return {
      status: status,
      tasks: tasksInColumn
    }
  })

  const updateTask = (task: Task) => {
    const updatedTasks = tasks.map((t) => {
      return t.id === task.id ? task : t
    })
    setTasks(updatedTasks)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: Status) => {
    e.preventDefault()
    setCurrentlyHovering(null)
    const id = e.dataTransfer.getData("id")
    const task = tasks.find((task) => task.id === id)
    if (task) {
      updateTask({...task, status})
    }
  }

  const [currentlyHovering, setCurrentlyHovering] = useState<Status | null>(null)

  const handleDragEnter = (status: Status) => {
    setCurrentlyHovering(status)
  }
  return (
    <>
      <div className="flex divide-x">
        {columns.map((column) => (
          
          <div className="flex-grow" 
            onDrop={(e) => handleDrop(e, column.status)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => handleDragEnter(column.status)}
          >
            <div className="flex justify-between">
              <h1 className="text-3xl p-2 capitalize font-semibold text-neutral-500">{column.status}</h1>
              <div className="text-xl font-semibold p-2 text-neutral-500">
                {column.tasks.reduce((total, task) => total + (task?.points || 0), 0)}
              </div>
            </div>

            <div className={`h-full ${currentlyHovering === column.status ? "bg-neutral-300" : ""}`}>
            
            {column.tasks.map((task) => 
            <TaskCard task={task} updateTask={updateTask} /> 
            )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App