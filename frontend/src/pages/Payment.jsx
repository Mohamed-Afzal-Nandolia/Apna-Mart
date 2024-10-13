import { useState } from "react";
import { Header } from "../components/Header";
import { useCartItems } from "../hooks/useCartItems";
import { CartOverlay } from "../components/CartOverlay";
import { Loader2 } from "lucide-react";

export const Payment = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, updateCartItems } = useCartItems();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      updateCartItems([]);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPaymentSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        toggleCart={() => setIsCartOpen(true)}
        cartItemsCount={cartItems.length}
      />
      <CartOverlay
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateCartItems={updateCartItems}
      />
      <div className="container mx-auto px-4 py-8 flex justify-center items-center mt-40 flex-col">
        <button
          className="bg-main-green text-white hover:bg-main-green/90 transition-colors px-4 py-2 rounded-md shadow-md"
          onClick={handlePayment}
          disabled={loading || paymentSuccess}
        >
          {loading ? <Loader2 className="animate-spin" /> : paymentSuccess ? "Payment Successful" : "PAY"}
        </button>
      </div>
    </>
  );
};
