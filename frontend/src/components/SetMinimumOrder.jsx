import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAdminByEmail, getAmount, updateAmount } from "../services/Apis";

export const SetMinimumOrder = () => {
    const [minOrderValue, setMinOrderValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAdminId = async () => {
      try {
        const response = await getAdminByEmail(localStorage.getItem("admin-email"));
        return response.data.a_id; // Return adminId after fetching
      } catch (error) {
        console.error("Failed to fetch admin:", error);
        return null; // If failed, return null
      }
    };

    // Fetch the current minimum order value
    useEffect(() => {
      const fetchMinOrderValue = async () => {
        try {
          // Await the fetchAdminId to get the adminId first
          const adminId = await fetchAdminId();
        localStorage.setItem("admin-id", adminId);
          if (adminId) {
            const response = await getAmount(adminId); // Now use the valid adminId
            if (response.data === undefined) {
              setMinOrderValue(0);
            } else {
              setMinOrderValue(response.data);
            }
          } else {
            toast.error("Admin ID not found.",{
                pauseOnHover: false,
                autoClose: 1500,
              });
          }
        } catch (error) {
          console.error("Failed to fetch minimum order value:", error);
          toast.error("Could not load the current minimum order value.",{
            pauseOnHover: false,
            autoClose: 1500,
          });
        }
      };
      
      fetchMinOrderValue(); // Call the function to fetch data
    }, []); // Empty dependency array ensures this runs only once when the component mounts
    

  // Handle form submission to update the minimum order value
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);  
    try {
      const response = await updateAmount(localStorage.getItem("admin-id"), minOrderValue);
      console.log("Amount updated successfully:", response.data);
      toast.success("Minimum order value updated successfully!",{
        pauseOnHover: false,
        autoClose: 1500,
      });
    } catch (error) {
      console.error("Failed to update minimum order value:", error);
      toast.error("Could not update the minimum order value.",{
        pauseOnHover: false,
        autoClose: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
  <div className="w-full h-auto flex flex-col place-items-center mt-16 mb-8">
    <div className="bg-white shadow-md rounded-lg p-8 w-96">
      <h1 className="text-2xl font-bold text-center mb-6">Set Minimum Order</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="minOrderValue" className="font-semibold">
            Minimum Order Value:
          </label>
          <input
            id="minOrderValue"
            type="number"
            className="border rounded-md p-2 mt-1"
            value={minOrderValue}
            onChange={(e) => setMinOrderValue(Number(e.target.value))}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Set Minimum Value"}
        </button>
      </form>
    </div>
  </div>


  );
};  
