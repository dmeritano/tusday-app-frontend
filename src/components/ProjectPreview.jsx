import React from 'react'
import { Link } from "react-router-dom"

const ProjectPreview = ({project}) => {

  const { name, _id, client} = project
  return (
    <div className="border-b p-5 flex">
        <p className="flex-1">
            {name}

            <span className="text-sm text-gray-500 uppercase">{''} {client}</span>
        </p>

        <Link
            to={`${_id}`}
            className="text-gray-600 hover:text-gray-900 uppercase text-sm font-bold"
        >Open</Link>
    </div>
  )
}

export default ProjectPreview