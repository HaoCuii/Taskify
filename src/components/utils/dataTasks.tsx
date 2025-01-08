export type Task = {
  title: string
  id: string
  status: Status
  priority: Priority
  points?: number
}

export type Status = "todo" | "in-progress" | "done"
export type Priority = "low" | "medium" | "high"

export const statuses: Status[] = ["todo","in-progress","done"]
export const priorities: Priority[] = ["low","medium","high"]

export const tasks: Task[] = [
  {
    title: "I am Task 1",
    id: "Bus-1",
    status: "todo",
    points: 5,
    priority: "low"
  },
  {
    title: "I am Task 2",
    id: "Bus-2",
    status: "in-progress",
    points: 8,
    priority: "low"
  },
  {
    title: "I am Task 3",
    status: "done",
    id: "Bus-3",
    points: 5,
    priority: "low"
  },  
  {
    title: "I am Task 4",
    status: "done",
    id: "Bus-4",
    points: 5,
    priority: "medium"
  },  
  {
    title: "I am Task 5",
    status: "todo",
    id: "Bus-5",
    points: 5,
    priority: "medium"
  },  
  {
    title: "I am Task 6",
    status: "in-progress",
    id: "Bus-6",
    points: 5,
    priority: "medium"
  },  
  {
    title: "I am Task 7",
    status: "todo",
    id: "Bus-7",
    points: 0,
    priority: "high"
  },  
]