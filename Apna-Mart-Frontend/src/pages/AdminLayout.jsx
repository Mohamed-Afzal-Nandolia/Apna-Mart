import { Outlet } from "react-router-dom"

export const AdminLayout = () => {
  return (
    <div className="w-screen">
      <Outlet />
    </div>
  )
}
