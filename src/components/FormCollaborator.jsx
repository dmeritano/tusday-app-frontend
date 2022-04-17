import { useState } from "react"
import useProjects from "../hooks/useProjects"
import Alert from "./Alert"

const FormCollaborator = () => {
  
  const [email, setEmail] = useState("")
  const { showAlert,alert,submitCollaborator } = useProjects()

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (email === "") {
      showAlert({
        msg: "All fields are required",
        error: true
      })
      return
    }

    submitCollaborator(email)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white py-10 px-5 w-full md:w-1/2 shadow-md rounded"
    >
      {alert.msg && <Alert alert={alert}/>}
      <div className="mb-5">
        <label
          className="uppercase text-gray-500 block text-xl font-bold"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter new collaborator's email address"
          className="w-full mt-1 p-3 border rounded bg-blue-50"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
      </div>
      <input
        type="submit"
        value="Find"        
        className="bg-orange-600 text-white uppercase w-full py-2 font-bold rounded hover:cursor-pointer hover:bg-orange-900 transition-colors"
      />
    </form>
  )
}

export default FormCollaborator
