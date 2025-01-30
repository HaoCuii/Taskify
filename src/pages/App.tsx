import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import TaskCard from "../components/taskCard"
import { priorities, Priority, Status, statuses, Task } from "../components/utils/dataTasks"
import AddTask from "../components/AddTask"
import { Columns, Layout } from "lucide-react"
import { writeData, readData, deleteData } from "../../firebase"
import { onValue } from "firebase/database"

const generateTaskId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

const App = () => {
  const { roomId } = useParams<{ roomId: string }>()
  const navigate = useNavigate()
  const [tasks, setTasks] = useState<Task[]>([])
  const [currentlyHovering, setCurrentlyHovering] = useState<Status | null>(null)

  useEffect(() => {
    const roomRef = readData(roomId)
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const tasksArray = Object.values(data) as Task[]
        setTasks(tasksArray)
      } else {
        console.error('Room not found')
        navigate('/join')
      }
    })
  }, [roomId, navigate])

  const updateTask = (task: Task) => {
    setTasks((prevTasks) => prevTasks.map(t => t.id === task.id ? task : t))
    console.log(task)
    writeData(roomId, task.id, task.title, task.description, task.status, task.priority, task.points, task.image || null)
  }

  const addTask = (status: Status, title: string, priorityIndex: number, description: string, image: string | null) => {
    const newTask: Task = {
      title: title,
      description: description,
      id: generateTaskId(),
      status: status,
      priority: priorities[priorityIndex],
      points: 0,
      image: image
    }
    setTasks([...tasks, newTask])
    writeData(roomId, newTask.id, newTask.title || "", newTask.description || "", newTask.status, newTask.priority, newTask.points, newTask.image || null)
  }

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId))
    deleteData(roomId, taskId)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: Status) => {
    e.preventDefault()
    setCurrentlyHovering(null)
    const id = e.dataTransfer.getData("id")
    const task = tasks.find((task) => task.id === id)
    if (task) {
      const updatedTask = { ...task, status }
      updateTask(updatedTask)
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
        <div className="max-w-7xl mx-auto">
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
    </div>
  )
}

export default App
