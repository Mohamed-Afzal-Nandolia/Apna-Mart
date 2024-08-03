import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
// import reactLogo from "../assets/react.svg"
import viteLogo from "/vite.svg";
import { DashboardMain } from "../components/DashboardMain";
import { useSearchParams } from "react-router-dom";

export const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams({ tab: "Dashboard" });
  const tab = searchParams.get("tab");

  return (
    <div className="flex h-screen w-full">
      <Sidebar aria-label="" className="min-w-64">
        <Sidebar.Logo img={viteLogo} imgAlt="Flowbite logo">
          Apna Mart
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              icon={HiChartPie}
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set("tab", "dashboard");
                  return prev;
                });
              }}
            >
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item
              icon={HiViewBoards}
              label="Pro"
              labelColor="dark"
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set("tab", "kanban");
                  return prev;
                });
              }}
            >
              Kanban
            </Sidebar.Item>
            <Sidebar.Item
              icon={HiInbox}
              label="3"
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set("tab", "inbox");
                  return prev;
                });
              }}
            >
              Inbox
            </Sidebar.Item>
            <Sidebar.Item
              icon={HiUser}
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set("tab", "users");
                  return prev;
                });
              }}
            >
              Users
            </Sidebar.Item>
            <Sidebar.Collapse icon={HiShoppingBag} label="Products">
              <Sidebar.Item onClick={() => {
                setSearchParams((prev) => {
                  prev.set("tab", "products");
                  return prev;
                });
              }}>Product List</Sidebar.Item>
              <Sidebar.Item onClick={() => {
                setSearchParams((prev) => {
                  prev.set("tab", "add-product");
                  return prev;
                });
              }}>Add Product</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Item
              icon={HiArrowSmRight}
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set("tab", "signin");
                  return prev;
                });
              }}
            >
              Sign In
            </Sidebar.Item>
            <Sidebar.Item
              icon={HiTable}
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set("tab", "aignup");
                  return prev;
                });
              }}
            >
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <DashboardMain searchParams={tab}/>
    </div>
  );
};
