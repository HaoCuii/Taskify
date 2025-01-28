import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import TaskCard from "../components/taskCard"
import { priorities, Priority, Status, statuses, Task } from "../components/utils/dataTasks"
import AddTask from "../components/addTask"
import { Columns } from "lucide-react"

const App = () => {
  const { roomId } = useParams<{ roomId: string }>()
  const navigate = useNavigate()
  const [tasks, setTasks] = useState<Task[]>([])
  const [currentlyHovering, setCurrentlyHovering] = useState<Status | null>(null)

  useEffect(() => {
    fetch(`http://localhost:1337/rooms/${roomId}/tasks`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Room not found')
        }
        return response.json()
      })
      .then((data) => {
        setTasks(data)
      })
      .catch((error) => {
        console.error(error)
        navigate('/join')
      })
  }, [roomId, navigate])

  const updateTask = (task: Task) => {
    fetch(`http://localhost:1337/rooms/${roomId}/tasks/${task.id}`, {
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

  const addTask = (status: Status, title: string, priorityIndex: number, description: string, image: string | null) => {
    const newTask: Task = {
      title: title,
      description: description,
      id: `Task-${tasks.length + 1}`,
      status: status,
      priority: priorities[priorityIndex],
      points: 0,
      image: image
    }
    fetch(`http://localhost:1337/rooms/${roomId}/tasks`, {
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

  const columns = statuses.map((status) => {
    const tasksInColumn = tasks.filter((task) => task.status === status)
    return {
      status: status,
      tasks: tasksInColumn
    }
  })

  return (
    <div className="bg-neutral-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Columns size={32} className="text-neutral-600" />
          <h1 className="text-4xl font-bold text-neutral-800">Task Management Board</h1>
        </div>
        
        <div className="grid grid-cols-4 gap-6">
          {columns.map((column) => (
            <div 
              key={column.status} 
              className="bg-white rounded-xl shadow-md p-4 transition-all duration-300"
              onDrop={(e) => handleDrop(e, column.status)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={() => handleDragEnter(column.status)}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl capitalize font-semibold text-neutral-700">{column.status}</h2>
                <div className="bg-neutral-200 text-neutral-600 px-2 py-1 rounded-full text-sm font-medium">
                  {column.tasks.reduce((total, task) => total + (task?.points || 0), 0)} pts
                </div>
              </div>

              <div 
                className={`space-y-4 min-h-[400px] transition-colors duration-300 ${
                  currentlyHovering === column.status ? "bg-neutral-100" : ""
                }`}
              >
                {column.tasks.map((task) => (
                  <TaskCard key={task.id} task={task} updateTask={updateTask}  />
                ))}
              </div>
              
              <AddTask 
                addTask={(title, priorityIndex, description, image) => 
                  addTask(column.status, title, priorityIndex, description, image)
                } 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App