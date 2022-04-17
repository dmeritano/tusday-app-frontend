import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useProjects from "../hooks/useProjects"
import FormProject from "../components/FormProject"
import ModalDeleteProject from "../components/ModalDeleteProject"

const EditProyect = ({ buttonText }) => {
  const params = useParams()

  const { getProjectById, project, loading, deleteProject, handleModalDeleteProject } = useProjects()

  useEffect(() => {
    getProjectById(params.id)
  }, [])


  const { name, _id } = project

  /*
  const handleClick = () => {
    if (confirm("Delete project " + name + " ?")){      
      deleteProject(_id)
    }
  }*/

  if (loading) return "Loading..."

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-black text-gray-600 text-left">
          <span className="text-4xl mr-2 text-orange-700">Editing</span>
          {name}
        </h1>

        <div className="flex items-center gap-2 text-gray-500 hover:text-orange-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <button
            className="uppercase font-bold"
            onClick={handleModalDeleteProject}
          >Delete</button>          
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <FormProject />
      </div>

      <ModalDeleteProject />

    </>
  )
}

export default EditProyect
