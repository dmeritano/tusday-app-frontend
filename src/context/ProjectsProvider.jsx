import { useState, useEffect, createContext} from "react"
import { useNavigate } from "react-router-dom"
import { axiosClient, axiosClientRequestAuthConfig } from "../config/axiosClient"

const ProjectsContext = createContext()

const ProjectsProvider = ({children}) => {

    const [projects, setProjects] = useState([])
    const [alert, setAlert] = useState({})
    const [project, setProject] = useState({})
    const [loading, setLoading] = useState(false)

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
            
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const deleteProjet = async (id) => {
                
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
                deleteProjet
            }}
        >{children}
        </ProjectsContext.Provider>
    )
}

export { 
    ProjectsProvider
}
export default ProjectsContext