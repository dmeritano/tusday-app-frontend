import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { axiosClient } from "../config/axiosClient"
import Alert from "../components/Alert"

const AccountConfirmation = () => {
  const [alert, setAlert] = useState({})
  const [accountConfirmed, setAccountConfirmed] = useState(false)

  const params = useParams()
  const { id } = params

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${id}`

        const { data } = await axiosClient(url)
        setAlert({ msg: data.msg })
        setAccountConfirmed(true)
      } catch (error) {
        setAlert({ msg: error.response.data.msg, error: true })
      }
    }
    confirmAccount()
  }, [])

  return (
    <>
      <h1 className="text-gray-400 text text-2xl text-left">
        Project & Tasks Administration App
      </h1>
      <h1 className="text-orange-600 font-black text-5xl text-right">TusDay</h1>
      <h1 className="uppercase text-gray-600 block text-1xl font-bold text-left mt-10 mb-1 ml-1">
        Account confirmation
      </h1>

      <div className="mt-20 md:mt-5 px-5 py-5 shadow-md rounded bg-white">
        {alert.msg && <Alert alert={alert} />}
        {accountConfirmed && (
          
          <Link
            className="block text-center my-5 text-orange-500 text-lg"
            to="/"
          >
            Sign in!
          </Link>

        )}
      </div>
      

    </>
  )
}

export default AccountConfirmation
