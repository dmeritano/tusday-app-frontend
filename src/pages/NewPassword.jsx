import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { axiosClient } from "../config/axiosClient"
import Alert from "../components/Alert"
import { validPassword } from "../helpers"

const NewPassword = () => {
  const [password, setPassword] = useState("")
  const [alert, setAlert] = useState({})
  const [validToken, setValidToken] = useState(false)
  const [passwordUpdated, setPasswordUpdated] = useState(false)
  const params = useParams()
  const { token } = params

  //reset-password
  useEffect(() => {
    const checkToken = async () => {
      try {
        const url = `/users/reset-password/${token}`
        const { data } = await axiosClient(url)
        setValidToken(true)
      } catch (error) {
        setAlert({ msg: error.response.data.msg, error: true })
      }
    }
    checkToken()
  }, [])


  const handleSubmit = async (evt) => {
    evt.preventDefault()
    if (!validPassword(password)){
      setAlert({msg:"Password: Only letters and numbers | At least 6 chars",error:true})
      return
    }

    try {
      const url = `/users/reset-password/${token}`
      const { data } = await axiosClient.post(url,{password})
      
      setAlert({msg:data.msg})
      setPassword("")
      setPasswordUpdated(true)

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
      {alert.msg && <Alert alert={alert} />}
      {validToken && (
        <>
          <h1 className="uppercase text-gray-600 block text-1xl font-bold text-left mt-6 mb-1 ml-1">
            Create a new password
          </h1>

          <form className="mb-1 bg-white p-10 shadow-md rounded" onSubmit={handleSubmit}>
            <div className="my-5">
              <label
                className="uppercase text-gray-500 block text-xl font-bold"
                htmlFor="password"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Your new access password"
                className="w-full mt-1 p-3 border rounded bg-blue-50"
                value={password}
                onChange={ evt => setPassword(evt.target.value)}
              />
            </div>
            <input
              type="submit"
              value="update"
              className="bg-orange-600 mb-5 text-white uppercase w-full py-2 font-bold rounded hover:cursor-pointer hover:bg-orange-900 transition-colors"
            />
          </form>
        </>
      )}

      {passwordUpdated && (          
          <Link
            className="block text-center my-5 text-orange-500 text-lg"
            to="/"
          >
            Sign in!
          </Link>
        )}

    </>
  )
}

export default NewPassword
