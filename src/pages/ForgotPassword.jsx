import axiosClient from "../config/axiosClient"
import { useState } from "react"
import { Link } from "react-router-dom"
import Alert from "../components/Alert"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [alert, setAlert] = useState({})

  const handleSubmit = async (evt) => {
    
    evt.preventDefault()    
    if (email.trim() === "" ){
      setAlert({
        msg:"All fields are required",
        error:true
      })
      return
    }

    try {
      const url = "/users/reset-password"
      const { data } = await axiosClient.post(url,{email})
      setAlert({msg:data.msg})
      setEmail("")

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
        Reseting your password
      </h1>

      <form
        className="mb-1 bg-white p-10 shadow-md rounded"
        onSubmit={handleSubmit}
      >
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
            onChange={ evt => setEmail(evt.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Reset"
          className="bg-orange-600 mb-5 text-white uppercase w-full py-2 font-bold rounded hover:cursor-pointer hover:bg-orange-900 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link className="block text-center my-5 text-orange-500 text-sm" to="/">
          Have an account? Login!
        </Link>

        <Link
          className="block text-center my-5 text-orange-500 text-sm"
          to="/register"
        >
          Don't have an account? Sign up!
        </Link>
      </nav>
    </>
  )
}

export default ForgotPassword
