import { toast } from "react-toastify";

export const addToCart = (item, quantity, cartItems, updateCartItems) => {
  console.log("Adding to cart:", item, quantity);
  const existingItem = cartItems.find(
    (cartItem) => cartItem.i_id === item.i_id
  );
  if (existingItem) {
    const updatedItems = cartItems.map((cartItem) =>
      cartItem.i_id === item.i_id
        ? { ...cartItem, i_quantity: cartItem.i_quantity + quantity }
        : cartItem
    );
    updateCartItems(updatedItems);
  } else {
    updateCartItems([...cartItems, { ...item, i_quantity: quantity }]);
  }
  toast.success(`Added ${quantity} to cart`);
};