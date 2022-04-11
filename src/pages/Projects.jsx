import useProjects from "../hooks/useProjects"
import ProjectPreview from "../components/ProjectPreview"
import Alert from "../components/Alert"

const Projects = () => {

  const { projects, alert } = useProjects()

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