import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Task = ({ id, title }) => {
    const {attributes,listeners, setNodeRef, transform, transition} = useSortable({id});

    console.log("transform",transform)
    console.log("transition",transition)
    
    const style = {transition,transform: CSS.Transform.toString(transform)};
    return (
      <div ref={setNodeRef} {...attributes} {...listeners} style={style}
      className="bg-neutral-100 rounded-md shadow-md w-full p-4 flex items-center justify-start mt-3 mb-3 touch-none">
        {title}
      </div>
    );
  };
  
  export default Task;
  