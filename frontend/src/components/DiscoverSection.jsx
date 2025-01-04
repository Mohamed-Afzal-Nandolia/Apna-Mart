import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { addToCart } from "../helpers/addToCart";
import { useLocation } from "react-router-dom";
import { getItemsByCategory, getFilteredItems, getProductsList } from "../services/Apis"; // Updated import to get all items

export const DiscoverSection = ({ cartItems, updateCartItems }) => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const [allItems, setAllItems] = useState([]); // State for all items
  const [filteredItems, setFilteredItems] = useState([]); // State for filtered items
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const subcategory = queryParams.get("subcategory");

  // Fetch all products initially
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await getProductsList(); // Fetch all items
        if (response && response.data) {
          setAllItems(response.data); // Store all items in state
        }
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };

    fetchAllProducts();
  }, []);

  // Fetch filtered products based on category and subcategory
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        let response;
        if (category && subcategory) {
          // Case 2: Both category and subcategory are selected
          response = await getFilteredItems(category, subcategory);
        } else if (category) {
          // Case 1: Only category is selected
          response = await getItemsByCategory(category);
        } else {
          // Case 3: No filters, show all products
          response = { data: allItems };
        }

        if (response && response.data) {
          setFilteredItems(response.data); // Update the filtered items state
        }
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      }
    };

    fetchFilteredProducts();
  }, [category, subcategory, allItems]); // Depend on allItems to fetch filtered items after the initial fetch

  const handleQuantityChange = (itemId, change) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 1) + change, 1),
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.i_id] || 1;
    addToCart(item, quantity, cartItems, updateCartItems);
  };

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-main-blue">
          Discover Our Organic Grocery Selection
        </h1>
        <p className="mt-2 text-main-green">
          Explore our wide range of high-quality, sustainable products.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.i_id}
              className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl bg-white flex flex-col justify-between h-full"
            >
              <div className="flex justify-center p-4">
                <img
                  src={item.i_image_path}
                  alt={item.i_name}
                  className="h-48 w-48 object-cover rounded-lg cursor-pointer"
                  onClick={() => navigate(`/item/${item.i_id}`)}
                />
              </div>
              <div className="p-4 flex-grow">
                <h3 
                  className="text-xl font-bold text-main-blue cursor-pointer"
                  onClick={() => navigate(`/item/${item.i_id}`)}
                >
                  {item.i_name}
                </h3>
                <p className="mt-3 mb-3 text-sm">{item.i_description}</p>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      className="text-main-blue hover:bg-primary-foreground px-2 py-1 rounded border"
                      onClick={() => handleQuantityChange(item.i_id, -1)}
                    >
                      -
                    </button>
                    <span className="mx-2 text-main-blue">
                      {quantities[item.i_id] || 1}
                    </span>
                    <button
                      className="text-main-blue hover:bg-primary-foreground px-2 py-1 rounded border"
                      onClick={() => handleQuantityChange(item.i_id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center justify-start flex-grow">
                    <span className="mx-2 text-main-blue">
                      Price: ₹{item.i_price}
                    </span>
                  </div>
                  <button
                    className="border bg-main-green text-white bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary z-20 relative"
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.i_availability}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No items found for the selected filters.</p>
        )}
      </div>
    </>
  );
};

DiscoverSection.propTypes = {
  cartItems: PropTypes.array.isRequired,
  updateCartItems: PropTypes.func.isRequired,
};