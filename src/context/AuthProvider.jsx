import { useState, useEffect, createContext } from "react"
import { useNavigate } from "react-router-dom"
import { axiosClient, axiosClientRequestAuthConfig } from "../config/axiosClient"


const AuthContext = createContext()

const AuthProvider = ( {children} ) => {

    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem("token")
            if (!token){
                setLoading(false)
                return
            }
            try {
                const { data } = await axiosClient("/users/profile",
                            axiosClientRequestAuthConfig(token))
                setAuth(data)
                //navigate("/projects")
            } catch (error) {
                setAuth({})
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        authenticateUser()
    },[])

    const closeSessionAuth = () => {
        setAuth({})
    }

    return (

        <AuthContext.Provider
            value={({
                auth,
                setAuth,
                loading,
                closeSessionAuth
            })}
        >
            {children}
        </AuthContext.Provider>

    )
}

export {
    AuthProvider
}

export default AuthContext