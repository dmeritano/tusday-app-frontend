import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alert from "../components/Alert"
import { axiosClient } from "../config/axiosClient"


import useAuth from "../hooks/useAuth"

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [alert, setAlert] = useState({})
  const { setAuth } = useAuth()

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    if ([email,password].includes('')){
      setAlert({
        msg:"All fields are required!",
        error:true
      })
      return
    }
    try {
      const url = "/users/login"
      const { data } = await axiosClient.post(url,{email, password})
      
      setAlert({})

      //Token in LS
      localStorage.setItem("token", data.token)
      //user data en auth context
      setAuth(data)


    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true })
    }
  }

  return (
    <>
      <h1 className="text-gray-400 text text-2xl text-left">
        Project & Tasks Administration App
      </h1>
      <h1 className="text-orange-600 font-black text-5xl text-right">TusDay</h1>
      {alert.msg && <Alert alert={alert}/>}
      <h1 className="uppercase text-gray-600 block text-1xl font-bold text-left mt-6 mb-1 ml-1">
        Login
      </h1>

      <form className="mb-1 bg-white p-10 shadow-md rounded" onSubmit={handleSubmit}>
        <div className="my-5">
          <label
            className="uppercase text-gray-500 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Registered email address"
            className="w-full mt-1 p-3 border rounded bg-blue-50"
            value={email}
            onChange={evt => setEmail(evt.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-500 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Your stunning secret password!"
            className="w-full mt-1 p-3 border rounded bg-blue-50"
            value={password}
            onChange={evt => setPassword(evt.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Init session"
          className="bg-orange-600 mb-5 text-white uppercase w-full py-2 font-bold rounded hover:cursor-pointer hover:bg-orange-900 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-orange-500 text-sm"
          to="/register"
        >
          Don't have an account? Sign up!
        </Link>
        <Link
          className="block text-center my-5 text-orange-500 text-sm"
          to="/forgot-password"
        >
          I forgot my password
        </Link>
      </nav>
    </>
  )
}

export default Login
