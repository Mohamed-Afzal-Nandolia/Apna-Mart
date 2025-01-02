import { useState } from "react";
import { Header } from "../components/Header";
import { useCartItems } from "../hooks/useCartItems";
import { CartOverlay } from "../components/CartOverlay";
import { Loader2 } from "lucide-react";
import { postEmail, postSms } from "../services/Apis";

export const Payment = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, updateCartItems } = useCartItems();
  const [loading, setLoading] = useState(false);
  const userdata = JSON.parse(localStorage.getItem("shippingDetails"));

  const handlePayment = async () => {
    setLoading(true);
    console.log(cartItems)
    try {

      // Assuming cartItems contains the details of the items
      const emailData = {
        to: userdata.email,
        subject: "Order Confirmation",
        body: 
        `
        Thank you for your order!

        Here are your order details:
        ${"\n"}
        ${cartItems
          .map(
            (item) =>
              `- ${item.i_name} (x${item.i_quantity}): ₹${item.i_price * item.i_quantity}`
          )
          .join("\n")}
        
        Total: ₹${cartItems.reduce(
          (total, item) => total + item.i_price * item.i_quantity,
          0
        )}

        Your order will be delivered to:
        ${"\n"}
        ${userdata.address}
      `,
      };

      // console.log(localStorage.getItem("user-email")) THIS IS WORKING
      // console.log(localStorage.getItem("Authorization"))   THIS IS WORKING
      //console.log(getPhoneByEmail(localStorage.getItem("user-email"))); REMOVED AS OF NOW
      
      const smsData = {
        phoneNumber: "+91" + userdata.phone,
        message: emailData.body,
      };
      

      // Call the backend to send the email
      await postEmail(emailData); //Not calling the email API as of now!!!! though it has no problems!!!! just uncommment it!

      // Call the backend to send the email
      await postSms(smsData); //NOT CALLING THE SMS API AS OF NOW!!!!

      // Clear the cart and show a success message
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
          {loading ? <Loader2 className="animate-spin" /> : paymentSuccess ? "Payment Successful" : "Click to Confirm Your Order"}
        </button>
      </div>
    </>
  );
};
