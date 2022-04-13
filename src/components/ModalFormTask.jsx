import { Fragment, useState, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import useProjects from "../hooks/useProjects"
import Alert from "./Alert"
import { useParams } from "react-router-dom"

const PRIORITIES = ["Low", "Medium", "High"]

const ModalFormTask = () => {
  const { modalFormTask, handleModalTask, showAlert, alert, submitTask, task } =
    useProjects()

  const [id, setId] = useState(null) //To determine if we are creating or editing
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [priority, setPriority] = useState("")

  const params = useParams() //id:3223 => project ID

  useEffect(() => {
    if (task?._id) {
      setId(task._id)
      setName(task.name)
      setDescription(task.description)
      setDeliveryDate(task.deliveryDate?.split("T")[0])
      setPriority(task.priority)
      return
    }
    setId(null)
    setName("")
    setDescription("")
    setDeliveryDate("")
    setPriority("")
  }, [task])

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    if ([name, description, priority, deliveryDate].includes("")) {
      showAlert({
        msg: "All fields are required",
        error: true,
      })
      return
    }

    //Submit task
    await submitTask({
      id,
      name,
      description,
      deliveryDate,
      priority,
      project: params.id,
    })
    setId(null)
    setName("")
    setDescription("")
    setDeliveryDate("")
    setPriority("")
  }

  return (
    <Transition.Root show={modalFormTask} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleModalTask}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-orange-400 hover:text-orange-600 focus:outline-none focus:ring-offset-2"
                  onClick={handleModalTask}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-bold text-gray-900"
                  >
                    {id ? "Edit task" : "Create task"}
                  </Dialog.Title>

                  <form className="my-10" onSubmit={handleSubmit}>
                    {alert.msg && <Alert alert={alert} />}
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
                        placeholder="Task name"
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
                        placeholder="Task description"
                        className="border w-full p-2 mt-2 rounded bg-blue-50"
                        value={description}
                        rows="4"
                        onChange={(evt) => setDescription(evt.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-5">
                      <label
                        className="text-gray-500 uppercase font-bold text-sm"
                        htmlFor="delivery-date"
                      >
                        Delivery date
                      </label>
                      <input
                        id="delivery-date"
                        type="date"
                        className="border w-full p-2 mt-2 rounded bg-blue-50"
                        value={deliveryDate}
                        onChange={(evt) => setDeliveryDate(evt.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        className="text-gray-500 uppercase font-bold text-sm"
                        htmlFor="priority"
                      >
                        Priority
                      </label>
                      <select
                        id="priority"
                        className="border w-full p-2 mt-2 rounded bg-blue-50"
                        value={priority}
                        onChange={(evt) => setPriority(evt.target.value)}
                      >
                        <option value="">-- Select --</option>
                        {PRIORITIES.map((opt) => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <input
                      type="submit"
                      value={id ? "Update" : "Create"}
                      className="bg-orange-600 text-white uppercase w-full py-2 font-bold rounded hover:cursor-pointer hover:bg-orange-900 transition-colors text-sm"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ModalFormTask
