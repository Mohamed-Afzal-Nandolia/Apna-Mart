import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllCategories, deleteCategory } from "../services/Apis";

export const DeleteCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch categories on component mount
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

  // Handle category deletion
  const handleDelete = async () => {
    if (!selectedCategory) {
      toast.error("Please select a category to delete.", {
        pauseOnHover: false,
        autoClose: 1500,
      });
      return;
    }

    setIsLoading(true);
    try {
      await deleteCategory(selectedCategory);
      toast.success("Category deleted successfully!", {
        pauseOnHover: false,
        autoClose: 1500,
      });

      // Remove deleted category from the list
      setCategories(categories.filter((category) => category.c_id !== parseInt(selectedCategory)));
      setSelectedCategory("");
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error("Could not delete the category. Please try again.", {
        pauseOnHover: false,
        autoClose: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-5 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Delete Category</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <label htmlFor="category" className="block text-lg font-semibold mb-2">
          Select Category:
        </label>
        <select
          id="category"
          className="w-full border rounded-md p-2 mb-4"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="" disabled>
            -- Select a category --
          </option>
          {categories.map((category) => (
            <option key={category.c_id} value={category.c_id}>
              {category.c_name}
            </option>
          ))}
        </select>
        <button
            onClick={handleDelete}
            disabled={isLoading}
            className={`w-full py-2 rounded-md text-white ${
                isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-700 hover:bg-gray-800 transition"
            }`}
            >
            {isLoading ? "Deleting..." : "Delete Category"}
            </button>
      </div>
    </div>
  );
};
