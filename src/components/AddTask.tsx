import { useState } from "react"
import React from "react"
import { Priority, tags } from "./utils/dataTasks"

const AddTask = ({ addTask }: { addTask: (title: string, priority: Priority, description: string) => void }) => {
  const [isClicked, setIsClicked] = useState(false)
  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState(tags[0])
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    const priorityValue = priority.slice(1) as Priority
    addTask(title, priorityValue, description)
    setTitle("")
    setPriority(tags[0])
    setDescription("")
    setIsClicked(false)
  }

  return (
    <div>
      <div className="rounded-lg hover:bg-neutral-100 p-2 m-2 flex justify-center ">
        <button onClick={() => setIsClicked(true)} className="size-10 w-full">+ Add a card</button>
      </div>
      {isClicked && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/2 bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl mb-2">Add New Task</h2>
            <div>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-lg mb-2"
              />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 border rounded-lg mb-2"
              >
                {tags.map((tag) => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-lg mb-2"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded">Add Task</button>
              <button onClick={() => setIsClicked(false)} className="bg-red-500 text-white p-2 rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddTask
