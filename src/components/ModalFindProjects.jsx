import { Fragment, useState } from "react"
import { Combobox, Dialog, Transition } from "@headlessui/react"
import useProjects from "../hooks/useProjects"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const ModalFindProjects = () => {
  const { modalFindProjects, handleModalFindProjects, projects } = useProjects()

  const [searchData, setSearchData] = useState("")

  const filteredProjects = searchData === '' ? [] 
        : projects.filter( p => p.name.toLowerCase().includes(searchData.toLowerCase()))

  return (
    <Transition.Root
      show={modalFindProjects}
      as={Fragment}
      afterLeave={() => setSearchData('')}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto mt-20 p-4 sm:p-20 md:p-20"
        onClose={handleModalFindProjects}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded bg-white shadow-2xl transition-all"
            onChange={ (project) => (window.location = `/projects/${project._id}`)}
          >
            <div className="relative">
              <Combobox.Input
                className="h-12 w-full bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 sm:text-sm"
                placeholder="Search..."
                onChange={evt => setSearchData(evt.target.value)}
              />
            </div>

            {filteredProjects.length > 0 && (
                <Combobox.Options static className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                    {filteredProjects.map(project => (
                        <Combobox.Option
                            key={project._id}
                            value={project}
                            className={({active}) => classNames('cursor-default select-none px-4 py-2', active && 'bg-orange-600 text-white')}
                        >
                            {project.name}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}

export default ModalFindProjects
