import { Route, Routes } from "react-router-dom"
import { AdminLayout } from "./pages/AdminLayout"
import { AdminSignup } from "./pages/AdminSignup"
import { AdminSignin } from "./pages/AdminSignin"
import { Dashboard } from "./pages/Dashboard"
import { NotFound } from "./pages/NotFound"

function App() {

  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="signup" element={<AdminSignup />}/> 
        <Route path="signin" element={<AdminSignin />}/> 
        <Route path="dashboard" element={<Dashboard />}/> 
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}

export default App
