import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../helpers/loginCheck";
import { ShoppingCart } from "lucide-react";
import PropTypes from "prop-types";
import logo from "../assets/apnamart.jpg";
import { useEffect, useState } from "react";
import { getAllCategories } from "../services/Apis"; // Assuming you have this function to get categories

export const Header = ({ toggleCart, cartItemsCount }) => {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  // Fetch categories and subcategories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories(); // Fetch categories from API
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle category change
  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(""); // Reset subcategory when category changes

    // Fetch subcategories for the selected category
    const category = categories.find((cat) => cat.c_id === parseInt(categoryId));
    setSubcategories(category?.subCategories || []); // Set subcategories for the selected category
  };

  // Handle subcategory change
  const handleSubcategoryChange = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
  };

  const handleFilterSubmit = () => {
    // Update the URL with selected category and subcategory, which will trigger the useEffect
    navigate(`?category=${selectedCategory}&subcategory=${selectedSubcategory}`);
  };  

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 text-primary-foreground py-4 text-white flex justify-between items-center px-12">
      {/* Logo */}
      <img
        src={logo}
        alt="APNA MART"
        className="w-52 h-auto cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Category and Subcategory Dropdowns next to the logo */}
      <div className="flex items-center gap-6"> {/* Aligning the dropdowns next to the logo */}
        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="border p-2 rounded text-black"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.c_id} value={category.c_id}>
              {category.c_name}
            </option>
          ))}
        </select>

        {/* Subcategory Dropdown */}
        <select
          value={selectedSubcategory}
          onChange={(e) => handleSubcategoryChange(e.target.value)}
          className="border p-2 rounded text-black"
          disabled={!selectedCategory}
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory.sc_id} value={subcategory.sc_id}>
              {subcategory.sc_name}
            </option>
          ))}
        </select>

        <button
          onClick={handleFilterSubmit}
          className="bg-gray-700 text-white py-2 px-2 rounded-md hover:bg-gray-900 transition"
          disabled={!selectedCategory}
        >
          Apply Filter
        </button>

      </div>

      {/* Cart Icon */}
      <div className="flex items-center gap-8">
        <div className="relative">
          <ShoppingCart
            color="indigo"
            onClick={toggleCart}
            className="cursor-pointer w-12 h-8"
          />
          <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2">
            {cartItemsCount > 0 && cartItemsCount}
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  toggleCart: PropTypes.func.isRequired,
  cartItemsCount: PropTypes.number.isRequired,
};
