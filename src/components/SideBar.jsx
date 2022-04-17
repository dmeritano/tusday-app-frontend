import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const SideBar = () => {

  const demoMode = (import.meta.env.VITE_DEMO_MODE && (import.meta.env.VITE_DEMO_MODE === "true") )

  const { auth } = useAuth()

  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
      <p className="pl-1 text-md font-light">{auth.name}</p>

      <Link
        to="create-project"
        className="bg-orange-600 text-white font-bold block mt-5 text-center uppercase p-2 w-full rounded hover:cursor-pointer hover:bg-orange-900 transition-colors"
      >Create project</Link>  

      {demoMode && (
        <>
          <p className="mt-10 text-red-700">Demo mode: <span className="text-sm text-gray-600">create, update and delete operations are disabled</span></p> 
        </>
      )}
    </aside>
  )
}

export default SideBar