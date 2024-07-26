import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
// import reactLogo from "../assets/react.svg"
import viteLogo from "/vite.svg"
import { DashboardMain } from "../components/DashboardMain";
import { useSearchParams } from "react-router-dom";


export const Dashboard = () => {

  const [searchParams, setSearchParams] = useSearchParams({tab: ""});
  const tab = searchParams.get("tab");

  return (
    <div className="flex h-screen w-full">
      <Sidebar aria-label="Default sidebar example" className="">
        <Sidebar.Logo href="#" img={viteLogo} imgAlt="Flowbite logo">
          Apna Mart
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="?tab=Dashboard" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="?tab=Kanban" icon={HiViewBoards} label="Pro" labelColor="dark">
              Kanban
            </Sidebar.Item>
            <Sidebar.Item href="?tab=Inbox" icon={HiInbox} label="3">
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href="?tab=Users" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="?tab=Products" icon={HiShoppingBag}>
              Products
            </Sidebar.Item>
            <Sidebar.Item href="?tab=SignIn" icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item>
            <Sidebar.Item href="?tab=SignUp" icon={HiTable}>
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <DashboardMain searchParams={tab}/>
    </div>
  )
}
