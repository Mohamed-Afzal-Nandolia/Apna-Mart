import { X, Plus, Minus } from "lucide-react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";

export const CartOverlay = ({ isOpen, onClose, cartItems, updateCartItems }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("CartOverlay cartItems:", cartItems);
  }, [cartItems]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.i_price * item.i_quantity,
    0
  );

  const removeItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.i_id !== id);
    updateCartItems(updatedItems);
  };

  const adjustQuantity = (id, adjustment) => {
    const updatedItems = cartItems.map((item) => {
      if (item.i_id === id) {
        const newQuantity = Math.max(0, item.i_quantity + adjustment);
        return newQuantity === 0 ? null : { ...item, i_quantity: newQuantity };
      }
      return item;
    }).filter(Boolean); // Remove any null items (quantity reduced to 0)
    updateCartItems(updatedItems);
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 bg-white shadow-lg transform w-full max-w-md flex justify-end ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="pt-4 w-full">
        <div className="flex justify-between items-center mb-4 px-4">
          <h2 className="text-lg font-bold text-main-green">Your Cart</h2>
          <X onClick={onClose} className="cursor-pointer" />
        </div>
        <div className="flex-grow p-4 border-t">
          {cartItems.map((item) => (
            <div
              key={item.i_id}
              className="flex justify-between items-center mb-4"
            >
              <div>
                <h3 className="font-medium text-main-blue">{item.i_name}</h3>
                <p className="text-sm text-gray-500">
                  ₹{item.i_price.toFixed(2)} x {item.i_quantity}
                </p>
              </div>
              <div className="flex items-center">
                <Button
                  onClick={() => adjustQuantity(item.i_id, -1)}
                  color="light"
                  size="sm"
                  className="p-1 mr-2"
                >
                  <Minus size={16} />
                </Button>
                <span className="mx-2">{item.i_quantity}</span>
                <Button
                  onClick={() => adjustQuantity(item.i_id, 1)}
                  color="light"
                  size="sm"
                  className="p-1 ml-2"
                >
                  <Plus size={16} />
                </Button>
                <Button
                  onClick={() => removeItem(item.i_id)}
                  color="light"
                  size="sm"
                  className="border-none ml-4"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length > 0 ? (
          <div className="border-t p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-main-green">Total:</span>
              <span className="font-semibold">₹{totalPrice.toFixed(2)}</span>
            </div>
            <Button
              onClick={() => navigate("/checkout")}
              className="w-full"
              color="indigo"
            >
              Proceed to Checkout
            </Button>
          </div>
        ) : (<div className="w-full text-center py-4"> Add items to cart! </div>)}
      </div>
    </div>
  );
};

CartOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cartItems: PropTypes.array.isRequired,
  updateCartItems: PropTypes.func.isRequired,
};
