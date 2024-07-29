import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
// import reactLogo from "../assets/react.svg"
import viteLogo from "/vite.svg"
import { DashboardMain } from "../components/DashboardMain";
import { useSearchParams } from "react-router-dom";


export const Dashboard = () => {

  const [searchParams, setSearchParams] = useSearchParams({tab: "Dashboard"});
  const tab = searchParams.get("tab");

  return (
    <div className="flex h-screen w-full">
      <Sidebar aria-label="Default sidebar example" className="min-w-52">
        <Sidebar.Logo img={viteLogo} imgAlt="Flowbite logo">
          Apna Mart
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={HiChartPie} onClick={() => {setSearchParams(prev => {
              prev.set("tab", "Dashboard")
              return prev
            })}}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item icon={HiViewBoards} label="Pro"  labelColor="dark" onClick={() => {setSearchParams(prev => {
              prev.set("tab", "Kanban")
              return prev
            })}}>
              Kanban
            </Sidebar.Item>
            <Sidebar.Item icon={HiInbox} label="3" onClick={() => {setSearchParams(prev => {
              prev.set("tab", "Inbox")
              return prev
            })}}>
              Inbox
            </Sidebar.Item>
            <Sidebar.Item icon={HiUser} onClick={() => {setSearchParams(prev => {
              prev.set("tab", "Users")
              return prev
            })}}>
              Users
            </Sidebar.Item>
            <Sidebar.Item icon={HiShoppingBag} onClick={() => {setSearchParams(prev => {
              prev.set("tab", "Products")
              return prev
            })}}>
              Products
            </Sidebar.Item>
            <Sidebar.Item icon={HiArrowSmRight} onClick={() => {setSearchParams(prev => {
              prev.set("tab", "SignIn")
              return prev
            })}}>
              Sign In
            </Sidebar.Item>
            <Sidebar.Item icon={HiTable} onClick={() => {setSearchParams(prev => {
              prev.set("tab", "SignUp")
              return prev
            })}}>
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <DashboardMain searchParams={tab}/>
    </div>
  )
}
