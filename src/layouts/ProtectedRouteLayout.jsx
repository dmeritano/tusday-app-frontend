import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"
import SideBar from "../components/SideBar"

const ProtectedRouteLayout = () => {

    const { auth, loading } = useAuth()

    if (loading) return "Loading..."
    return (
        <>
            {auth._id ? 
            (
                <div className="bg-blue-100">
                    <Header />
                    <div className="md:flex md:min-h-screen">
                        <SideBar />
                        <main className="p-10 flex-1 bg-blue-100">
                            <Outlet />
                        </main>
                    </div>
                </div>
            ): <Navigate to="/" />}
        </>
    )
}

export default ProtectedRouteLayout
