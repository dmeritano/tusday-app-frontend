import { useState } from "react"
import { Link } from "react-router-dom"
import Alert from "../components/Alert"
import { validPassword } from "../helpers" 
import axiosClient from "../config/axiosClient"

const Register = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordRepeat, setPasswordRepeat] = useState("")
  const [alert, setAlert] = useState({})


  const handleSubmit = async (evt) => {
    evt.preventDefault()

    if ([name,email,password,password].includes("")){      
      setAlert({msg:"All fields are required",error:true})
      return
    }else if(password !== passwordRepeat){
      setAlert({msg:"Passwords doesn't not match",error:true})
      return
    }else if (!validPassword(password)){
      setAlert({msg:"Password: Only letters and numbers | At least 6 chars",error:true})
      return
    }

    setAlert({})

    //Create user through the api
    try {
      const response = await axiosClient.post("/users", {name,email,password})
      const { data } = response
      
      //If we are here, all was good!
      setName("")
      setEmail("")
      setPassword("")
      setPasswordRepeat("")
      //Tell it to user
      setAlert({msg:data.msg})
    } catch (error) {
      setAlert({msg:error.response.data.msg, error:true})
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
        Register - Create your account
      </h1>
      <form className="mb-1 bg-white p-10 shadow-md rounded" onSubmit={handleSubmit}>
        <div className="my-5">
          <label
            className="uppercase text-gray-500 block text-xl font-bold"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your fullname"
            className="w-full mt-1 p-3 border rounded bg-blue-50"
            value={name}
            onChange={evt => setName(evt.target.value)}
          />
        </div>
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
        <div className="my-5">
          <label
            className="uppercase text-gray-500 block text-xl font-bold"
            htmlFor="passwordrepeat"
          >
            Repeat password
          </label>
          <input
            type="password"
            id="passwordrepeat"
            placeholder="Enter choosed password again"
            className="w-full mt-1 p-3 border rounded bg-blue-50"
            value={passwordRepeat}
            onChange={evt => setPasswordRepeat(evt.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Sign UP!"
          className="bg-orange-600 mb-5 text-white uppercase w-full py-2 font-bold rounded hover:cursor-pointer hover:bg-orange-900 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link className="block text-center my-5 text-orange-500 text-sm" to="/">
          You have an account? Sign in!
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

export default Register
