import { useEffect } from "react"
import { useParams } from "react-router-dom"
import FormCollaborator from "../components/FormCollaborator"
import useProjects from "../hooks/useProjects"
import Alert from "../components/Alert"

const NewCollaborator = () => {
  
  const demoMode = (import.meta.env.VITE_DEMO_MODE && (import.meta.env.VITE_DEMO_MODE === "true") )

  const { getProjectById, project, loading, collaborator, addCollaborator, alert } = useProjects()
  const params = useParams()

  useEffect(()=>{
    getProjectById(params.id)
  },[])


  if (!project?._id) return <Alert alert={alert} />

  return (
    <>
      <h1 className="text-4xl font-black text-gray-600 text-center">
        <span className="text-4xl mr-2 text-orange-700">Adding</span>
        New Collaborator
      </h1>
      <h3 className="text-xl font-black text-gray-500 text-center">
        Project:<span className="ml-2 text-orange-700">{project.name}</span>
      </h3>

      <div className="mt-10 flex justify-center">            
        <FormCollaborator />
      </div>
      {loading ? <p className="text-center">Searching...r</p> : collaborator?._id && (
        <div className="flex justify-center mt-10">
          <div className="bg-white py-10 px-5 w-full md:w-1/2 rounded shadow">
            <h2 className="text-left mb-5 text-md font-bold text-gray-600">Results</h2>
            <div className="flex justify-between items-center">
              <p>{collaborator.name}</p>
              <button
                type="button"
                disabled={demoMode}
                className={`bg-orange-600 text-white px-5 rounded font-bold text-sm hover:bg-orange-900 transition-colors ${demoMode ? "cursor-not-allowed" : "hover:cursor-pointer"}`}
                onClick={() => addCollaborator({email:collaborator.email})}
              >Add</button>
            </div>
          </div>
        </div>
      )}      
    </>
  )
}

export default NewCollaborator
