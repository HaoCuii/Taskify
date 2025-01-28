import React, { useState } from 'react'
import { Task } from './utils/dataTasks'
import { Trash2, MinusCircle, PlusCircle } from 'lucide-react'

const TaskCard = ({ task, updateTask, deleteTask }: { task: Task; updateTask: (task: Task) => void; deleteTask: (taskId: string) => void }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const points = task.points || 0

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('id', task.id)
        e.currentTarget.style.opacity = '0.90'
      }}
      onDragEnd={(e) => {
        e.currentTarget.style.opacity = '1'
      }}
      className="bg-neutral-100 rounded-lg border border-gray-200 shadow-xl hover:shadow-md transition-all duration-200 overflow-hidden"
    > 
      {task.image && (
        <div className="relative">
          <img 
            src={task.image} 
            alt={task.title} 
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      <div className="p-3">
        <div className="flex justify-between items-start gap-2 mb-2">
          {isEditingTitle ? (
            <input
              type="text"
              value={task.title}
              onChange={(e) => updateTask({ ...task, title: e.target.value })}
              onBlur={() => setIsEditingTitle(false)}
              autoFocus
              className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          ) : (
            <div 
              onClick={() => setIsEditingTitle(true)}
              className="flex-1 font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
            >
              {task.title}
            </div>
          )}
          <button 
            onClick={() => deleteTask(task.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {task.description && (
          <div className="text-sm text-gray-600 mb-3">
            {task.description}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-500 font-mono text-xs">
              {task.id}
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityStyles(task.priority)}`}>
              {task.priority}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg p-2">
            <div className="text-xs font-medium text-gray-500">Points</div>
            <div className="flex items-center gap-2">
              <button
                className="text-gray-400 hover:text-red-500 transition-colors"
                onClick={() => updateTask({ ...task, points: Math.max(points - 1, 0) })}
                disabled={points === 0}
              >
                <MinusCircle size={16} />
              </button>
              <div className="w-6 text-center font-medium text-gray-700">
                {points}
              </div>
              <button
                className="text-gray-400 hover:text-blue-500 transition-colors"
                onClick={() => updateTask({ ...task, points: Math.min(points + 1, 10) })}
                disabled={points === 10}
              >
                <PlusCircle size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard