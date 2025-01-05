import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiClipboardList,
  HiTable,
  HiUser,
  HiViewBoards,
  HiViewList,
  HiPlus,
  HiOutlinePlusCircle,
  HiOutlineLogout,
  HiAdjustments,
  HiServer,
  HiPlusSm,
  HiOutlineDocumentRemove,
} from "react-icons/hi";
import Logo from "../assets/apna-mart-logo-png.png";
import { DashboardMain } from "../components/DashboardMain";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { validateToken } from "../services/Apis";
import { Button } from "flowbite-react";

export const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams({ tab: "Dashboard" });
  const tab = searchParams.get("tab");
  const navigate = useNavigate();
  const [hasToken, setHasToken] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (!token) {
      // If the user is not logged in, redirect to the login page
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);  

  useEffect(() => {
    const checkToken = async () => {
        try {
          const response = await validateToken();
          console.log("Call has been done and ", response.data);
          setHasToken(true); // Token is present
          setTokenValid(true); // Token is valid
        } catch (error) {
          console.error("Call has been done and ", error.response?.data);
          setTokenValid(false); // Token is invalid
        }
    };

    const token = localStorage.getItem("Authorization");
    if (token) {
        checkToken(); // Validate the token if it exists
    } else {
        setHasToken(false); // No token found
    }
  }, []);

  const handleLoginRedirect = () => {
    console.log("Redirecting to login page");
    localStorage.removeItem("Authorization");
    localStorage.removeItem("admin-email");
    navigate("/admin/login");
  };

  if (tokenValid === false && hasToken === true) {
    return (
      <div className="flex flex-col pt-16">
        <div className="container mx-auto px-4 py-12">
          <p className="text-center text-red-500">
            Your session has expired or the token is invalid. Please try logging in again.
          </p>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleLoginRedirect}
              className="text-main-blue inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-6 text-sm font-medium text-primary shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full">
      <Sidebar aria-label="" className="min-w-64">
        <Sidebar.Logo img={Logo} imgAlt="Flowbite logo">
          Apna Mart
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item 
            icon={HiViewList}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSearchParams((prev) => {
                prev.set("tab", "products");
                return prev;
              });
            }}>Product List</Sidebar.Item>
            <Sidebar.Item
            icon={HiOutlinePlusCircle} 
            style={{ cursor: "pointer" }} 
            onClick={() => {
              setSearchParams((prev) => {
                prev.set("tab", "add-product");
                return prev;
              });
            }}>Add Product</Sidebar.Item>
            <Sidebar.Item
              icon={HiAdjustments}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set("tab", "set-minimum-order");
                  return prev;
                });
              }}
            >
              Minimum Order
            </Sidebar.Item>
            <Sidebar.Collapse icon={HiServer} label="Category">
            <Sidebar.Item
                icon={HiTable}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("tab", "all-category");
                    return prev;
                  });
                }}
              >
                All Categories
              </Sidebar.Item>
              <Sidebar.Item
                icon={HiPlus}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("tab", "create-category");
                    return prev;
                  });
                }}
              >
                Add Category
              </Sidebar.Item>
              <Sidebar.Item
                icon={HiViewBoards}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("tab", "create-sub-category");
                    return prev;
                  });
                }}
              >
                Add Sub Category
              </Sidebar.Item>
              <Sidebar.Item
                icon={HiOutlineDocumentRemove}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("tab", "delete-category");
                    return prev;
                  });
                }}
              >
                Delete Category
              </Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Item
              icon={HiOutlineLogout}
              style={{ cursor: "pointer" }}
              onClick={() => {
                localStorage.removeItem("Authorization");
                navigate("/admin/login");
              }}
            >
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <DashboardMain searchParams={tab}/>
    </div>
  );
};
