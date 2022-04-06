import { BrowserRouter, Routes, Route } from "react-router-dom"

import AuthLayout from "./layouts/AuthLayout"
import ProtectedRouteLayout from "./layouts/ProtectedRouteLayout"

import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import NewPassword from "./pages/NewPassword"
import AccountConfirmation from "./pages/AccountConfirmation"
import Projects from "./pages/Projects"
import NewProject from "./pages/NewProject"

import { AuthProvider } from "./context/AuthProvider"




function App() {

  return (

    <BrowserRouter>
      <AuthProvider>
        
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />}/>
              <Route path="register" element={<Register />}/>
              <Route path="forgot-password" element={<ForgotPassword />}/>
              <Route path="forgot-password/:token" element={<NewPassword />}/>
              <Route path="account-confirm/:id" element={<AccountConfirmation />} />
            </Route>

            {/* Protected routes - Projects*/}
            <Route path="/projects" element={<ProtectedRouteLayout />}>
              <Route index element={<Projects />}/>
              <Route path="create-project" element={<NewProject />}/>
            </Route>

        </Routes>
        
      </AuthProvider>
    </BrowserRouter>


  )
}

export default App
