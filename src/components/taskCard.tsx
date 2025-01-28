import React, { useState } from 'react'
import { Task } from './utils/dataTasks'
import { Trash2 } from 'lucide-react'

const TaskCard = ({ task, updateTask, deleteTask }: { task: Task; updateTask: (task: Task) => void; deleteTask: (taskId: string) => void }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const points = task.points || 0

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
      className="border rounded-lg px-2 m-2 bg-neutral-100 shadow-md w-56"
    >
      <div>{task.image && <img src={task.image} alt={task.title} className="w-full h-32 object-cover" />}</div>
      <div className="flex justify-between items-center text-base py-2 font-semibold">
        {isEditingTitle ? (
          <input
            type="text"
            value={task.title}
            onChange={(e) => updateTask({ ...task, title: e.target.value })}
            onBlur={() => setIsEditingTitle(false)}
            autoFocus
            className="w-full"
          />
        ) : (
          <div onClick={() => setIsEditingTitle(true)}>{task.title}</div>
        )}
        <button className="text-red-500 w-4 h-4 flex items-center justify-center ml-2" onClick={() => deleteTask(task.id)}>
          <Trash2 size={16} />
        </button>
      </div>
      <div>{task.description && <div className="text-sm">{task.description}</div>}</div>
      <div className="flex justify-between py-2 text-sm">
        <div className="flex gap-2">
          <div>{task.id}</div>
          {task.priority === 'high' && <div className="px-2 border rounded-md bg-red-300 shadow-sm">🔴high</div>}
          {task.priority === 'medium' && <div className="px-2 border rounded-md bg-yellow-200 shadow-sm">🟡medium</div>}
          {task.priority === 'low' && <div className="px-2 border rounded-md bg-green-300 shadow-sm">🟢low</div>}
        </div>

        <div className="flex items-center gap-2">
          <button
            className="bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
            onClick={() => updateTask({ ...task, points: Math.max(points - 1, 0) })}
          >
            -
          </button>
          <div>{points}</div>
          <button
            className="bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
            onClick={() => updateTask({ ...task, points: Math.min(points + 1, 10) })}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
