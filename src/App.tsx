import React, { useEffect, useState } from "react"
import TaskCard from "./components/taskCard"
import { Priority, Status, statuses, Task } from "./components/utils/dataTasks"
import AddTask from "./components/addTask"

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [currentlyHovering, setCurrentlyHovering] = useState<Status | null>(null)

  const columns = statuses.map((status) => {
    const tasksInColumn = tasks.filter((task) => task.status === status)
    return {
      status: status,
      tasks: tasksInColumn
    }
  })

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data)
      })
  }, [])

  const updateTask = (task: Task) => {
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    })
    const updatedTasks = tasks.map((t) => {
      return t.id === task.id ? task : t
    })
    setTasks(updatedTasks)
  }

  const addTask = (status: Status, title: string, priority: Priority, description: string) => {
    const newTask: Task = {
      title: title,
      description: description,
      id: `Bus-${tasks.length + 1}`,
      status: status,
      priority: priority,
      points: 0
    }
    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    })
    .then((response) => response.json())
    .then((data) => {
      setTasks([...tasks, data])
    })
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: Status) => {
    e.preventDefault()
    setCurrentlyHovering(null)
    const id = e.dataTransfer.getData("id")
    const task = tasks.find((task) => task.id === id)
    if (task) {
      updateTask({ ...task, status })
    }
  }

  const handleDragEnter = (status: Status) => {
    setCurrentlyHovering(status)
  }

  return (
    <>
      <div className="flex divide-x">
        {columns.map((column) => (
          <div key={column.status} className="flex-grow"
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
                <TaskCard key={task.id} task={task} updateTask={updateTask} />
              )}
            </div>
            <AddTask addTask={(title, priority, description) => addTask(column.status, title, priority, description)} />
          </div>
        ))}
      </div>
    </>
  )
}

export default App