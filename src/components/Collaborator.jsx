import useProjects from "../hooks/useProjects"

const Collaborator = ({ collaborator }) => {

  const { name, email, _id } = collaborator
  const { handleModalDeleteCollaborator } = useProjects()

  return (
    <div className="border-b px-5 py-2 flex justify-between items-center">
      <div>
        <p>{name}</p>
        <p className="text-sm text-gray-600">{email}</p>
      </div>
      <div>
        <button
          type="button"
          className="w-20 border-2 border-red-600 bg-transparent px-3 py-1 text-red-600 text-sm rounded"
          onClick={() => handleModalDeleteCollaborator(collaborator)}
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default Collaborator
