import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="px-4 py-2 bg-white border-b">
      <div className="md:flex md:justify-between">
          <h2 className="text-orange-600 font-black text-4xl text-left">TusDay
            <span className="pl-1 text-xs font-black text-gray-500 tracking-wide hidden sm:block text-left">Project & Tasks Administration App</span>
          </h2>

          <input
            type="search"
            placeholder="Find projects"
            className="rounded lg:w-96 block p-2 border"
          />

          <div className="flex items-center gap-4">
            <Link
              to="/projects"
              className="font-bold uppercase"
            >Projects
            </Link>
            <button
              type="buttom"
              className="bg-orange-600 text-white text-sm uppercase py-2 px-3 font-bold rounded hover:cursor-pointer hover:bg-orange-900 transition-colors"
            >Logout</button>
          </div>
      </div>

    </header>
  )
}

export default Header