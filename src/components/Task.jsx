import useProjects from "../hooks/useProjects"
import useAdmin from "../hooks/useAdmin"
import { formatDate } from "../helpers"

const Task = ( {task} ) => {

    const { name, description, deliveryDate, priority, completed, completedBy, _id } = task

    const priorityColor = priority === "High" ? "text-red-500" : (priority === "Medium" ? "text-orange-400" : "text-gray-700")

    const { handleModalEditTask, handleModalDeleteTask, handleTaskStatus } = useProjects()

    const admin = useAdmin()

    return (
        <div className="border-b p-4 flex justify-between items-center">
            <div className="flex flex-col items-start">
                <p className="mb-1 text-xl">{name}</p>
                <p className="mb-1 text-sm font-mono">Priority: <span className={`font-sans ${priorityColor}`}>{priority}</span></p>
                <p className="mb-2 text-sm font-mono">Due date: <span className="text-md text-sky-900 font-sans">{formatDate(deliveryDate)}</span></p>
                <p className="text-sm text-gray-700">{description}</p>
                {completed && <p className="text-xs rounded px-2 mt-1 bg-gray-200 text-green-600">Completed By: {completedBy.name}</p>}               
            </div>
            <div className="flex flex-col lg:flex-row gap-1">
                {admin && (
                    <button 
                        className="w-20 border-2 border-sky-600 bg-transparent px-3 py-1 text-sky-600 text-sm rounded"
                        onClick={() => handleModalEditTask(task)}
                    >Edit</button>
                )}


                <button 
                    className={`w-20 border-2 text-sm rounded bg-green-100 px-3 py-1 ${completed ? "border-green-600 bg-green-100 text-green-700" : "border-gray-600 bg-gray-100  text-gray-700"}`}
                    onClick={() => handleTaskStatus(_id)}
                >{completed ? "Done" : "Undone"}</button>

                {admin && (
                    <button 
                        className="w-20 border-2 border-red-600 bg-transparent px-3 py-1 text-red-600 text-sm rounded"
                        onClick={() => handleModalDeleteTask(task)}
                    >Delete</button>                
                )}
            </div>
        </div>
    )    
}

export default Task