import { useNavigate, useLocation } from "react-router-dom"; // Add useLocation import
import { isLoggedIn } from "../helpers/loginCheck";
import { ShoppingCart } from "lucide-react";
import PropTypes from "prop-types";
import logo from "../assets/apnamart.jpg";
import { useEffect, useState } from "react";
import { getAllCategories } from "../services/Apis";

export const Header = ({ toggleCart, cartItemsCount }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to get current location
  const loggedIn = isLoggedIn();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  // Check if we are on the checkout page
  const isCheckoutPage = location.pathname === "/checkout";
  const isPaymentPage = location.pathname === "/payment";

  // Fetch categories and subcategories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        //console.log("Fetched Categories:", response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Reset subcategories when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find((cat) => cat.c_id === parseInt(selectedCategory));
      setSubcategories(category?.subCategories || []);
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory, categories]);

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(""); // Reset subcategory when category changes
  };

  const handleSubcategoryChange = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
  };

  const handleFilterSubmit = () => {
    console.log("Filter submitted!");
    console.log("Selected Category:", selectedCategory);
    console.log("Selected Subcategory:", selectedSubcategory);
  
    if (!selectedCategory) {
      console.log("No category selected, navigating to home...");
      navigate('/');
    } else {
      // If category is selected, update the URL with the selected category and subcategory
      const subcategoryQuery = selectedSubcategory ? `&subcategory=${selectedSubcategory}` : '';
      navigate(`?category=${selectedCategory}${subcategoryQuery}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 text-primary-foreground py-4 text-white flex justify-between items-center px-12">
      <img
        src={logo}
        alt="APNA MART"
        className="w-52 h-auto cursor-pointer"
        onClick={() => navigate("/")}
      />
  
      <div className="flex items-center gap-6">
        {!isCheckoutPage && !isPaymentPage &&( // Only render the select elements if not on checkout page
          <>
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
          </>
        )}
      </div>
  
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
