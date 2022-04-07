import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useProjects from "../hooks/useProjects"
import Alert from "./Alert"


const FormProject = () => {  
  const [idProject, setIdProject] = useState(null) //To determine if we are creating or editing
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [client, setClient] = useState("")
  const params = useParams()
  const { showAlert,alert,submitProject,project } = useProjects()

  useEffect(()=>{
    if(params.id){
      setIdProject(project._id)
      setName(project.name)
      setDescription(project.description)      
      setDeliveryDate(project.deliveryDate?.split('T')[0])
      setClient(project.client)
    }else{

    }
  },[params])

  

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    if ([name,description,deliveryDate,client].includes("")){
        showAlert({
            msg:"All fields are required",
            error: true
        })
        return
    }

    //Send data to provider (creating or updating project)
    await submitProject({idProject, name,description,deliveryDate,client}) //idProject is null when we are creating
    setIdProject(null)
    setName("")
    setDescription("")
    setDeliveryDate("")
    setClient("")
    
  }

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 shadow-md rounded"
      onSubmit={handleSubmit}
    >
      {alert.msg && <Alert alert={alert}/>}
      <div className="mb-5">
        <label
          className="text-gray-500 uppercase font-bold text-sm"
          htmlFor="name"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Project name"
          className="border w-full p-2 mt-2 rounded bg-blue-50"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-500 uppercase font-bold text-sm"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          placeholder="Project description"
          className="border w-full p-2 mt-2 rounded bg-blue-50"
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        ></textarea>
      </div>
      <div className="mb-5">
        <label
          className="text-gray-500 uppercase font-bold text-sm"
          htmlFor="delivery-date"
        >
          Delivery Date
        </label>
        <input
          type="date"
          id="delivery-date"
          className="border w-full p-2 mt-2 rounded bg-blue-50"
          value={deliveryDate}
          onChange={(evt) => setDeliveryDate(evt.target.value)}
        />
      </div>
      <div className="mb-7">
        <label
          className="text-gray-500 uppercase font-bold text-sm"
          htmlFor="client"
        >
          Client
        </label>
        <input
          type="text"
          id="client"
          placeholder="Client Name / Id"
          className="border w-full p-2 mt-2 rounded bg-blue-50"
          value={client}
          onChange={(evt) => setClient(evt.target.value)}
        />
      </div>
      <input
          type="submit"
          value={idProject ? "Update" : "Create"}
          className="bg-orange-600 mb-5 text-white uppercase w-full py-2 font-bold rounded hover:cursor-pointer hover:bg-orange-900 transition-colors"
        />        
    </form>
  )
}

export default FormProject
