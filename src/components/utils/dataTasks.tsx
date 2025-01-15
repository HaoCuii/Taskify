export type Task = {
  title: string
  description?: string
  id: string
  status: Status
  priority: Priority
  points: number
  image?: string|null
}

export type Status = "todo" | "in-progress" | "done"
export type Priority = "low" | "medium" | "high"

export const statuses: Status[] = ["todo","in-progress","done"]
export const priorities: Priority[] = ["low","medium","high"]

export const tags: string[] = ["🟢low","🟡medium","🔴high"]