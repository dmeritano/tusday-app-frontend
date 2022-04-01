import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import NewPassword from "./pages/NewPassword"
import AccountConfirmation from "./pages/AccountConfirmation"


function App() {

  return (

    <BrowserRouter>
      <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />}/>
            <Route path="register" element={<Register />}/>
            <Route path="forgot-password" element={<ForgotPassword />}/>
            <Route path="forgot-password/:token" element={<NewPassword />}/>
            <Route path="account-confirm/:id" element={<AccountConfirmation />} />
          </Route>
      </Routes>
    </BrowserRouter>


  )
}

export default App
