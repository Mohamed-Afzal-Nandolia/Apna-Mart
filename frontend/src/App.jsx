import { Route, Routes } from "react-router-dom"
import { AdminLayout } from "./pages/AdminLayout"
import { AdminSignup } from "./pages/AdminSignup"
import { Dashboard } from "./pages/Dashboard"
import { NotFound } from "./pages/NotFound"
import { HomePage } from "./pages/HomePage"
import { UserSignup } from "./pages/UserSignup"
import { AdminLogin } from "./pages/AdminLogin"
import { UserLogin } from "./pages/UserLogin"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


function App() {

  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="signup" element={<AdminSignup />}/> 
          <Route path="login" element={<AdminLogin />}/> 
          <Route path="dashboard" element={<Dashboard />}/> 
        </Route>
        <Route path="/user" element={<AdminLayout />}>
          <Route path="signup" element={<UserSignup />}/> 
          <Route path="login" element={<UserLogin />}/> 
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
