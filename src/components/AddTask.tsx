import React from "react"

const AddTask = ({ addTask }: { addTask: () => void }) => {
  return (
    <div className="rounded-lg hover:bg-neutral-100 p-2 m-2 flex justify-center ">
      <button onClick={addTask} className="size-10 text-2xl w-full">+</button>
    </div>
  )
}

export default AddTask
