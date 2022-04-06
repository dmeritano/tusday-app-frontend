import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const SideBar = () => {


  const { auth } = useAuth()

  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
      <p className="pl-1 text-md font-light">{auth.name}</p>

      <Link
        to="create-project"
        className="bg-orange-600 text-white font-bold block mt-5 text-center uppercase p-2 w-full rounded hover:cursor-pointer hover:bg-orange-900 transition-colors"
      >Create project</Link>   
    </aside>
  )
}

export default SideBar