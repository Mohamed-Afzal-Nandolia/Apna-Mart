import React, { useState } from "react";
import { toast } from "react-toastify";
import { createCategory } from "../services/Apis";

export const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission to create a new category
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await createCategory(categoryName);
      console.log("Category created successfully:", response.data);
      toast.success("Category added successfully!", {
        pauseOnHover: false,
        autoClose: 1500,
      });

      // Reset the input field
      setCategoryName("");
    } catch (error) {
      console.error("Failed to create category:", error);
      toast.error("Could not create the category. Please try again.", {
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
        <h1 className="text-2xl font-bold text-center mb-6">Add Category</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="categoryName" className="font-semibold">
              Category Name:
            </label>
            <input
              id="categoryName"
              type="text"
              className="border rounded-md p-2 mt-1"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              required
            />
          </div>
          <button
            color="dark"
            type="submit"
            className="bg-gray-700 text-white py-2 rounded-md hover:bg-gray-900 transition"
            disabled={isLoading}
            >
            {isLoading ? "Creating..." : "Add Category"}
            </button>
        </form>
      </div>
    </div>
  );
};
