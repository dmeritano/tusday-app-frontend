import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import useProjects from "../hooks/useProjects"
import ModalFormTask from "../components/ModalFormTask"

const Project = () => {
  const params = useParams()
  const { getProjectById, project, loading, handleModalTask } = useProjects()
  const { name } = project
  const [modal, setModal] = useState(false)

  useEffect(() => {
    getProjectById(params.id)    
    
  }, [])
  

  if (loading) return "Loading..."

  //if (project.name) console.log(project)

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-black text-gray-600 text-center">
          <span className="text-4xl mr-2 text-orange-700">Project</span>
          {name}
        </h1>
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
      </div>
      <button
        onClick={ handleModalTask }
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

      <ModalFormTask modal={modal} setModal={setModal}/>
    </>
  )
}

export default Project
