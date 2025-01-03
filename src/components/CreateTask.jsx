import { useState } from "react";

const CreateTask = ({ addTask }) => { // Receive addTask as a prop
  const [isOpen, setIsOpen] = useState(false);
  const [taskContent, setTaskContent] = useState("");

  const handleCreateTask = () => {
    if (taskContent.trim()) {
      addTask(taskContent); // Use the addTask function passed from the parent (Board)
      setIsOpen(false);      // Close the modal after creating the task
      setTaskContent("");    // Clear the input field
    }
  };

  return (
    <div>
      <button
        className="bg-green-400 p-3 rounded-md mt-6 border border-green-600 border-2"
        onClick={() => setIsOpen(true)} 
      >
        Create Task
      </button>
      {isOpen && (
        <div className="bg-neutral-400 z-50 absolute top-[40%] left-1/2 w-1/3 sm:w-4/5 lg:w-1/3
        transform -translate-x-1/2 -translate-y-1/2 p-10 rounded-md">
            <h6 className="text-xl">Task Content</h6>
            <input
              type="text"
              className="bg-neutral-200 w-full mt-3"
              placeholder="Type Here..."
              onChange={(e) => setTaskContent(e.target.value)}  // Update the taskContent state
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateTask();  // Call handleCreateTask when "Enter" is pressed
                }
              }}
              value={taskContent}  // Bind input value to taskContent state
            />
        </div>
      )}
    </div>
  );
};

export default CreateTask;
