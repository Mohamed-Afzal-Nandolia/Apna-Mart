import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { createSubCategory, getAllCategories } from "../services/Apis";

export const CreateSubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Could not load categories. Please try again.", {
          pauseOnHover: false,
          autoClose: 1500,
        });
      }
    };
    fetchCategories();
  }, []);

  // Handle form submission to create a new subcategory
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!selectedCategoryId) {
        toast.error("Please select a category.", {
          pauseOnHover: false,
          autoClose: 1500,
        });
        return;
      }

      const response = await createSubCategory(selectedCategoryId, subCategoryName);
      console.log("Subcategory created successfully:", response.data);
      toast.success("Subcategory added successfully!", {
        pauseOnHover: false,
        autoClose: 1500,
      });

      // Reset the input fields
      setSubCategoryName("");
      setSelectedCategoryId("");
    } catch (error) {
      console.error("Failed to create subcategory:", error);
      toast.error("Could not create the subcategory. Please try again.", {
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
        <h1 className="text-2xl font-bold text-center mb-6">Add Sub Category</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="category" className="font-semibold">
              Select Category:
            </label>
            <select
              id="category"
              className="border rounded-md p-2 mt-1"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              required
            >
              <option value="">-- Select a Category --</option>
              {categories.map((category) => (
                <option key={category.c_id} value={category.c_id}>
                  {category.c_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="subCategoryName" className="font-semibold">
              Sub Category Name:
            </label>
            <input
              id="subCategoryName"
              type="text"
              className="border rounded-md p-2 mt-1"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              placeholder="Enter sub category name"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gray-700 text-white py-2 rounded-md hover:bg-gray-900 transition"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Add Sub Category"}
          </button>
        </form>
      </div>
    </div>
  );
};
