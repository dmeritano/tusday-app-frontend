import { useEffect } from "react"
import useProjects from "../hooks/useProjects"
import ProjectPreview from "../components/ProjectPreview"
import Alert from "../components/Alert"
import io from "socket.io-client"

let socket

const Projects = () => {

  const { projects, alert, deleteProyectNotification, updatedProjectNotification } = useProjects()

  //open socket io comm
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit("list-of-projects") //params.id == project._id
  },[]) //<- runs only once
  //Listen for changes
  useEffect(() => {    
    socket.on("project-deleted", deletedProject => {
        deleteProyectNotification(deletedProject)
    })
    socket.on("project-updated", updatedProject => {      
        updatedProjectNotification(updatedProject)
    })
  }) //<- no dependencies, so it runs all the time  
 
  const { msg } = alert

  return (
    <>
      <h1 className="text-4xl font-black text-gray-600 text-center">Projects</h1>

      {msg && <Alert alert={alert} />}

      <div className="bg-white shadow mt-10 rounded">
        {projects.length ? 
          projects.map(project => (
            <ProjectPreview key={project._id} project={project} />
            
          ))
          :<p className="text-center text-gray-600 uppercse p-5">There are no projects to show</p>
        }
        
      </div>
    </>
  )
}

export default Projects