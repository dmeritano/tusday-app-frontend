import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import useProjects from "../hooks/useProjects"
import useAdmin from "../hooks/useAdmin"
import ModalFormTask from "../components/ModalFormTask"
import ModalDeleteTask from "../components/ModalDeleteTask"
import ModalDeleteCollaborator from "../components/ModalDeleteCollaborator"
import Task from "../components/Task"
import Collaborator from "../components/Collaborator"
import io from "socket.io-client"

let socket


const Project = () => {
  const params = useParams()
  const { getProjectById, 
          project, 
          loading, 
          handleModalTask, 
          alert, 
          submitProjectTasks, 
          deleteProjectTask, 
          updateProjectTask, 
          changeTaskStatus } = useProjects()
  
  const admin = useAdmin()

  useEffect(() => {
    getProjectById(params.id)
  }, [])

  //open socket io comm
  useEffect(() => {
     socket = io(import.meta.env.VITE_BACKEND_URL)
     socket.emit("open-project", params.id) //params.id == project._id
  },[]) //<- runs only once
  //Listen for changes
  useEffect(() => {
    socket.on("task-created", newTask => {
      if (newTask.project === project._id){
        submitProjectTasks(newTask)
      } 
    })
    socket.on("task-deleted", deletedTask => {
      if (deletedTask.project === project._id){
        deleteProjectTask(deletedTask)
      }
    })
    socket.on("task-updated", updatedTask => {
      if (updatedTask.project._id === project._id){  // here comes complete project object, with all its attributes
        updateProjectTask(updatedTask)
      }
    })
    socket.on("task-status-updated", updatedTask => {
      if (updatedTask.project._id === project._id){  // here comes complete project object, with all its attributes
        changeTaskStatus(updatedTask)
      }
    })
    
    

  }) //<- no dependencies, so it runs all the time


  const { name, tasks, collaborators } = project

  if (loading) return "Loading..."

  const { msg } = alert

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-black text-gray-600 text-center">
          <span className="text-4xl mr-2 text-orange-700">Project</span>
          {name}
        </h1>
        {admin && (
          <div className="flex items-center gap-2 text-gray-500 hover:text-orange-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
            <Link
              to={`/projects/edit/${params.id}`}
              className="uppercase font-bold"
            >
              Edit
            </Link>
          </div>
        )}
      </div>
      {admin && (
        <button
          onClick={handleModalTask}
          type="button"
          className="bg-orange-400 text-white text-sm px-5 py-1 w-full md:w-auto rounded uppercase font-bold text-center mt-5 flex gap-2 items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
          Task
        </button>
      )}

      <p className="font-bold text-lg mt-10 text-gray-700">Task List</p>

      {/* {alert.msg && <Alert alert={alert} />} */}

      <div className="bg-white shadow mt-5 rounded">
        {tasks?.length ? (
          tasks?.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <p className="text-center text-gray-700 my-5 p-10">
            There are no tasks in the project.{" "}
            {admin && (<span className="text-orange-700">Try adding one!</span>)}
          </p>
        )}
      </div>

      {admin && (
        <>
          <div className="flex items-center justify-between mt-10">
            <p className="font-bold text-lg text-gray-700">Collaborators</p>

            <Link
              to={`/projects/new-collaborator/${project._id}`}
              className="uppercase text-gray-500 hover:text-orange-700 font-bold"
            >
              Add
            </Link>
          </div>

          <div className="bg-white shadow mt-5 rounded">
            {collaborators?.length ? (
              collaborators?.map((collaborator) => (
                <Collaborator
                  key={collaborator._id}
                  collaborator={collaborator}
                />
              ))
            ) : (
              <p className="text-center text-gray-700 my-5 p-10">
                There are no collaborators in the project{" "}
                <span className="text-orange-700">Try adding one!</span>
              </p>
            )}
          </div>
        </>
      )}

      <ModalFormTask />
      <ModalDeleteTask />
      <ModalDeleteCollaborator />
    </>
  )
}

export default Project
