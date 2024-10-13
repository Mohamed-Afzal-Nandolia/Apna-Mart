import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { REST_API_BASE_URL } from "../services/Apis";
import { addToCart } from "../helpers/addToCart";
import { Header } from "../components/Header";
import { useCartItems } from "../hooks/useCartItems";
import { CartOverlay } from "../components/CartOverlay";

export const ItemPage = () => {
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { itemId } = useParams();
  const { cartItems, updateCartItems } = useCartItems();
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Fetch item details based on itemId
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(
          `${REST_API_BASE_URL}/api/item/${itemId}`,
          {
            headers: {
              Authorization: localStorage.getItem("Authorization"),
            },
          }
        );
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching item details:", error);
        toast.error("Failed to load item details");
      }
    };

    fetchItemDetails();
  }, [itemId]);

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(prev + change, 1));
  };

  const handleAddToCart = () => {
    if (item) {
      addToCart(item, quantity, cartItems, updateCartItems);
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header toggleCart={() => setIsCartOpen(true)} cartItemsCount={cartItems.length} />
      <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} updateCartItems={updateCartItems} />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src={item.i_image_path}
              alt={item.i_name}
              className="w-[50%] h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
            <h1 className="text-3xl font-bold text-main-blue">{item.i_name}</h1>
            <p className="mt-4 text-lg text-gray-700">{item.i_description}</p>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-main-green">Price</h2>
              <p className="text-2xl font-bold">${item.i_price.toFixed(2)}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-main-green">
                Quantity
              </h2>
              <div className="flex items-center mt-2">
                <button
                  className="text-main-blue hover:bg-primary-foreground px-3 py-1 rounded border"
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </button>
                <span className="mx-4 text-xl">{quantity}</span>
                <button
                  className="text-main-blue hover:bg-primary-foreground px-3 py-1 rounded border"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
            </div>
            <button
              className="mt-8 w-full bg-main-green text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-main-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-green"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
