import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Task from "./Task/Task";

const Column = ({tasks}) => {
  return (
    <div className="bg-neutral-200 rounded-md p-2 flex flex-col mt-10 mb-10 w-4/5 lg:w-2/5">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map(
                tasks => <Task id={tasks.id} title={tasks.title} key={tasks.id}/>
            )}
        </SortableContext>
    </div>
  )
}

export default Column
