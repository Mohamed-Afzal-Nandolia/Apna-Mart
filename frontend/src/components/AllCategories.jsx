import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllCategories } from "../services/Apis";

export const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch categories and subcategories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        // Sort categories by c_id in ascending order
        const sortedCategories = response.data.sort((a, b) => a.c_id - b.c_id);
        setCategories(sortedCategories);
        // toast.success("Categories loaded successfully!", {
        //   pauseOnHover: false,
        //   autoClose: 1500,
        // });
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Could not fetch categories. Please try again.", {
          pauseOnHover: false,
          autoClose: 1500,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full p-5">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-900">
        Categories & Sub Categories
      </h1>
      {isLoading ? (
        <p className="text-center text-lg font-semibold text-gray-600">Loading...</p>
      ) : categories.length > 0 ? (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-lg font-semibold uppercase tracking-wider"
                >
                  Category ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-lg font-semibold uppercase tracking-wider"
                >
                  Category Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-lg font-semibold uppercase tracking-wider"
                >
                  Sub Categories
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {categories.map((category) => (
                <tr key={category.c_id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-800 font-medium">
                    {category.c_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-800 font-medium">
                    {category.c_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700">
                    {category.subCategories && category.subCategories.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {category.subCategories.map((subCategory) => (
                          <li key={subCategory.sc_id} className="text-gray-600">
                            {subCategory.sc_name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="italic text-gray-500">No subcategories</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-lg font-semibold text-gray-600">
          No categories found.
        </p>
      )}
    </div>
  );
};
