import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { addToCart } from "../helpers/addToCart";


export const DiscoverSection = ({ allItems, cartItems, updateCartItems }) => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});

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
        {allItems.map((item) => (
          <div
            key={item.i_id}
            className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl bg-white flex flex-col justify-start"
            
          >
            <div className="absolute inset-0 z-10 pointer-events-none">
              <Link to="#" className="absolute inset-0 pointer-events-auto">
                <span className="sr-only">View {item.i_name}</span>
              </Link>
            </div>
            <div className="flex justify-center p-4">
              <img
                src={item.i_image_path}
                alt={item.i_name}
                className="h-48 w-48 object-cover rounded-lg cursor-pointer"
                onClick={() => navigate(`/item/${item.i_id}`)}
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-main-blue cursor-pointer" onClick={() => navigate(`/item/${item.i_id}`)}>
                {item.i_name}
              </h3>
              <p className="mt-3 mb-3 text-sm">{item.i_description}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center z-20 relative">
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
                <button
                  className="border bg-main-green text-white bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary z-20 relative"
                  onClick={() => handleAddToCart(item)}
                  // disabled={!item.i_availability}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

DiscoverSection.propTypes = {
  allItems: PropTypes.array.isRequired,
  cartItems: PropTypes.array.isRequired,
  updateCartItems: PropTypes.func.isRequired,
};
