import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { io } from "socket.io-client"
import TaskCard from "../components/taskCard"
import { priorities, Priority, Status, statuses, Task } from "../components/utils/dataTasks"
import AddTask from "../components/AddTask"
import { Columns, Layout } from "lucide-react"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:1337"
const socket = io(API_URL)

const App = () => {
  const { roomId } = useParams<{ roomId: string }>()
  const navigate = useNavigate()
  const [tasks, setTasks] = useState<Task[]>([])
  const [currentlyHovering, setCurrentlyHovering] = useState<Status | null>(null)

  useEffect(() => {
    fetch(`${API_URL}/rooms/${roomId}/tasks`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Room not found')
        }
        return response.json()
      })
      .then((data) => {
        setTasks(Array.isArray(data) ? data : [])
      })
      .catch((error) => {
        console.error(error)
        navigate('/join')
      })

    socket.emit("join room", roomId, (roomTasks: Task[]) => {
      setTasks(Array.isArray(roomTasks) ? roomTasks : [])
    })

    socket.on("new task", (task: Task) => {
      setTasks((prevTasks) => [...prevTasks, task])
    })

    socket.on("updated task", (updatedTask: Task) => {
      setTasks((prevTasks) => prevTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      ))
    })

    socket.on("deleted task", (taskId: string) => {
      setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId))
    })

    return () => {
      socket.off("new task")
      socket.off("updated task")
      socket.off("deleted task")
    }
  }, [roomId, navigate])

  const updateTask = (task: Task) => {
    fetch(`${API_URL}/rooms/${roomId}/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    })
    .then((response) => response.json())
    .then((updatedTask) => {
      setTasks((prevTasks) => prevTasks.map(t => t.id === updatedTask.id ? updatedTask : t))
    })
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
    fetch(`${API_URL}/rooms/${roomId}/tasks`, {
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

  const deleteTask = (taskId: string) => {
    fetch(`${API_URL}/rooms/${roomId}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId))
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

  const getColumnHeaderColor = (status: Status) => {
    switch (status) {
      case "todo": return "bg-blue-50 border-blue-200"
      case "in-progress": return "bg-yellow-50 border-yellow-200"
      case "done": return "bg-green-50 border-green-200"
      default: return "bg-gray-50 border-gray-200"
    }
  }

  const getColumnBadgeColor = (status: Status) => {
    switch (status) {
      case "todo": return "bg-blue-100 text-blue-700"
      case "in-progress": return "bg-yellow-100 text-yellow-700"
      case "done": return "bg-green-100 text-green-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-6">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-center gap-4 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="p-3 bg-indigo-50 rounded-lg">
              <Layout className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Task Management Board</h1>
              <p className="text-sm text-gray-500">Room ID: {roomId}</p>
            </div>
          </div>
        </div>

        {/* Columns Grid */}
        <div className="max-w-7xl mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {columns.map((column) => (
              <div 
                key={column.status}
                className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-300"
                onDrop={(e) => handleDrop(e, column.status)}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => handleDragEnter(column.status)}
              >
                {/* Column Header */}
                <div className={`p-4 rounded-t-xl border-b ${getColumnHeaderColor(column.status)}`}>
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900 capitalize">
                      {column.status.replace("-", " ")}
                    </h2>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getColumnBadgeColor(column.status)}`}>
                      {column.tasks.reduce((total, task) => total + (task?.points || 0), 0)} pts
                    </div>
                  </div>
                </div>

                {/* Tasks Container */}
                <div 
                  className={`flex-1 p-4 space-y-4 min-h-[500px] transition-colors duration-300 ${
                    currentlyHovering === column.status 
                      ? "bg-gray-50" 
                      : ""
                  }`}
                >
                  {column.tasks.map((task) => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      updateTask={updateTask} 
                      deleteTask={deleteTask}
                    />
                  ))}
                </div>

                {/* Add Task Section */}
                <div className="p-4 border-t border-gray-200">
                  <AddTask 
                    addTask={(title, priorityIndex, description, image) => 
                      addTask(column.status, title, priorityIndex, description, image)
                    } 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default App
