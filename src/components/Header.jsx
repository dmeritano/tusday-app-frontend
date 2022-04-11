import { Link } from "react-router-dom"
import useProjects from "../hooks/useProjects"
import ModalFindProjects from "./ModalFindProjects"

const Header = () => {


  const {modalFindProjects, handleModalFindProjects } = useProjects()


  return (
    <header className="px-4 py-2 bg-white border-b">
      <div className="md:flex md:justify-between">
          <h2 className="text-orange-600 font-black text-4xl text-left mb-5 md:mb-0">TusDay
            <span className="pl-1 text-xs font-black text-gray-500 tracking-wide hidden sm:block text-left">Project & Tasks Administration App</span>
          </h2>


          <div className="flex flex-col md:flex-row items-center gap-4">

          <button
            className="font-bold uppercase"
            type="button"
            onClick={handleModalFindProjects}
          >Find Project</button>

            <Link
              to="/projects"
              className="font-bold uppercase"
            >Projects
            </Link>
            <button
              type="buttom"
              className="bg-orange-600 text-white text-sm uppercase py-2 px-3 font-bold rounded hover:cursor-pointer hover:bg-orange-900 transition-colors"
            >Logout</button>


            <ModalFindProjects />
          </div>
      </div>

    </header>
  )
}

export default Header