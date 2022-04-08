import { useState, useEffect, createContext} from "react"
import { useNavigate } from "react-router-dom"
import { axiosClient, axiosClientRequestAuthConfig } from "../config/axiosClient"

const ProjectsContext = createContext()

const ProjectsProvider = ({children}) => {

    const [projects, setProjects] = useState([])
    const [alert, setAlert] = useState({})
    const [project, setProject] = useState({})
    const [loading, setLoading] = useState(false)
    const [modalFormTask, setModalFormTask] = useState(false)
    const [modalDeleteTask, setModalDeleteTask] = useState(false)
    const [task, setTask] = useState({})
    const [collaborator, setCollaborator] = useState({})

    const navigate = useNavigate()
    

    
    useEffect(() => {
        const getProjects = async () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) return    
                const { data } = await axiosClient("/projects", axiosClientRequestAuthConfig(token))
                setProjects(data)
            } catch (error) {
                console.log(error)
            }
        }
        getProjects()
    },[])


    const showAlert = alert => {
        setAlert(alert)
        
        setTimeout(()=>{
            setAlert({})
        },3000)
    }
    
    const submitProject = async (project) => {
        if (project.idProject){
            //Editing
            await updateProject(project)            
        }else{
            //Creating
            await createProject(project)
        }
    }


    const createProject = async project => {
        try {
            const token = localStorage.getItem("token")
            if (!token) return

            const { data } = await axiosClient.post("/projects", project, axiosClientRequestAuthConfig(token))
            setProjects([...projects, data])
            setAlert({
                msg:"Project created successfully"
            })

            setTimeout( () => {
                setAlert({})
                navigate("/projects")
            },2000)

        } catch (error) {
            console.log(error)
        }
    }
    const updateProject = async project => {
        console.log(project)

        try {
            const token = localStorage.getItem("token")
            if (!token) return

            const { data } = await axiosClient.put(`/projects/${project.idProject}`, project, axiosClientRequestAuthConfig(token))
            //Sync the state of projects
            const updatedProyects = projects.map( stateProject => stateProject._id === data._id ? data : stateProject)
            setProjects(updatedProyects)

            setAlert({
                msg:"Project updated successfully"
            })

            setTimeout( () => {
                setAlert({})
                navigate("/projects")
            },2000)

        } catch (error) {
            console.log(error)
        }
    }

    const getProjectById = async (id) => {
        setLoading(true)
        try {            
            const token = localStorage.getItem("token")
            const { data } = await axiosClient(`/projects/${id}`, axiosClientRequestAuthConfig(token))
            
            setProject(data)
            setAlert({})
        } catch (error) {
            setAlert({
                msg:error.response.data.msg,
                error:true
            })
        }finally{
            setLoading(false)
        }
    }

    const deleteProject = async (id) => {
                
        try {            
            const token = localStorage.getItem("token")
            const { data } = await axiosClient.delete(`/projects/${id}`, axiosClientRequestAuthConfig(token))

            //Sync the state of projects
            const updatedProyects = projects.filter( stateProject => stateProject._id !== id )
            setProjects(updatedProyects)

            setAlert({msg:data.msg})

            setTimeout( () => {
                setAlert({})
                navigate("/projects")
            },1000)
            
        } catch (error) {
            console.log(error)
        }finally{}   
    }

    const handleModalTask = () => {
        setModalFormTask(!modalFormTask)
        setTask({})
    }

    const handleModalEditTask = (task) => {
        setTask(task)
        setModalFormTask(!modalFormTask)
    }

    const handleModalDeleteTask = (task) => {
        setTask(task)
        setModalDeleteTask(!modalDeleteTask)
    }

    const submitTask = async (task) => {        
        if (task?.id){
            await updateTask(task)
        }else{
            await createTask(task)
        }        
    }

    const createTask = async (task) => {
        try {
            const token = localStorage.getItem("token")
            const { data } = await axiosClient.post("/tasks", task, axiosClientRequestAuthConfig(token))            

            //Add task to state 
            const updated = {...project}
            updated.tasks = [...project.tasks, data]
            setProject(updated)
            setAlert({})
            setModalFormTask(false)
        } catch (error) {
            console.log(error)
        }
    }

    const updateTask = async (task) => {
        const token = localStorage.getItem("token")
        const { data } = await axiosClient.put(`/tasks/${task.id}`, task, axiosClientRequestAuthConfig(token))

        setAlert({})
        setModalFormTask(false)
    
        //Update project's tasks
        const updated = {...project}
        updated.tasks = updated.tasks.map( t => t._id === data._id ? data : t )
        setProject(updated)
    }

    
    const deleteTask = async () => {
        try {
            //Delete current task (in state)
            const token = localStorage.getItem("token")
            const { data } = await axiosClient.delete(`/tasks/${task._id}`, axiosClientRequestAuthConfig(token)) 
            setAlert({
                msg:data.msg
            })

            //Update project's tasks
            const updated = {...project}
            updated.tasks = updated.tasks.filter( t => t._id !== task._id )
            setProject(updated)
            setModalDeleteTask(false)
            setTask({})
            setTimeout(()=>{
                setAlert({})
            },2000)
        } catch (error) {
            console.log(error)
        }
    }

    const submitCollaborator = async (email) => {
        setLoading(true)
        try {
            const token = localStorage.getItem("token")
            const { data } = await axiosClient.post("/projects/collaborators", {email}, axiosClientRequestAuthConfig(token))
            setCollaborator(data)
            setAlert({})
        } catch (error) {
            console.log("no lo encontro:", error)            
            setAlert({
                msg:error.response.data.msg,
                error:true
            })            
            setTimeout(()=>{
                setAlert({})
            },2000)
        } finally{
            setLoading(false)
        }
    }

    const addCollaborator = async (email) => {
        try {
            const token = localStorage.getItem("token")
            const { data } = await axiosClient.post(`/projects/collaborators/${project._id}`, email, axiosClientRequestAuthConfig(token))
                        
            setAlert({
                msg:data.msg,
            })
            setCollaborator({})            
            setAlert({})
        } catch (error) {
            setAlert({
                msg:error.response.data.msg,
                error:true
            })
        }
    }

    return(
        <ProjectsContext.Provider
            value={{
                projects,
                showAlert,
                alert,
                submitProject,
                getProjectById,
                project,
                loading,
                deleteProject,
                modalFormTask,
                handleModalTask,
                submitTask,
                handleModalEditTask,
                task,
                modalDeleteTask,
                handleModalDeleteTask,
                deleteTask,
                submitCollaborator,
                collaborator,
                addCollaborator
            }}
        >{children}
        </ProjectsContext.Provider>
    )
}

export { 
    ProjectsProvider
}
export default ProjectsContext