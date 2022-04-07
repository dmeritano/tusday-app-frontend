import React from 'react'
import FormProject from '../components/FormProject'

const NewProject = () => {
    return (
        <>
          <h1 className="text-4xl font-black text-gray-600 text-center">
          <span className="text-4xl mr-2 text-orange-700">Creating</span>
          New Project</h1>
    
          <div className="mt-10 flex justify-center">
            
          <FormProject />

          </div>
        </>
      )
}

export default NewProject