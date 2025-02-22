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
  let adminEmail = "m45474516@gmail.com";
  let adminPhone = "8879438860";

  const handlePayment = async () => {
    setLoading(true);
    console.log(cartItems)
    try {

      // User's Email Data that will be forwared to the user
      const userEmailData = {
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

      // Admin's Email Data that will be forwared to the admin
      const adminEmailData = {
        to: adminEmail,
        subject: "Order Confirmation",
        body: 
        `
        An Order has been placed by ${userdata.name}!
        ${"\n"}
        Email: ${userdata.email}, Phone: ${userdata.phone}
        
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

        Shipping addres is as follows:
        ${"\n"}
        ${userdata.address}
      `,
      };
      
      // User's SMS Data that will be forwared to the user
      const userSmsData = {
        phoneNumber: "+91" + userdata.phone,
        message: userEmailData.body,
      };

      // Admin's SMS Data that will be forwared to the admin
      const adminSmsData = {
        phoneNumber: "+91" + adminPhone,
        message: adminEmailData.body,
      };
      
      // Calling the email and sms API for the User
      await postEmail(userEmailData); 
      // await postSms(userSmsData); 

      // Calling the email and sms API for the Admin
      await postEmail(adminEmailData); 
      // await postSms(adminSmsData); 

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
