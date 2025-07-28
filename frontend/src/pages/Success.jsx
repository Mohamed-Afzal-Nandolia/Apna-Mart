import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCartItems } from "../hooks/useCartItems";
import { handleOrderConfirmation } from "../utils/handleOrderConfirmation";

const Success = () => {
  const navigate = useNavigate();
  const { cartItems, updateCartItems } = useCartItems();
  const userData = JSON.parse(localStorage.getItem("shippingDetails"));

  useEffect(() => {
    const confirm = async () => {
      const success = await handleOrderConfirmation({
        cartItems,
        userData,
        updateCartItems,
      });

      if (success) {
        toast.success("Order successfully placed!");
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error("Order placed, but confirmation failed.");
      }
    };

    confirm();
  }, []);

  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-semibold">Processing your order...</h1>
    </div>
  );
};

export default Success;
