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
        body: `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; color: #333; }
              .container { max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
              h2 { color: #28a745; }
              .order-items { border-collapse: collapse; width: 100%; margin-top: 10px; }
              .order-items th, .order-items td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              .total { font-weight: bold; color: #d9534f; margin-top: 10px; font-size: 18px; }
              .footer { margin-top: 20px; font-size: 12px; color: #777; }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Thank You for Your Order! 🎉</h2>
              <p>Dear <span class="highlight">${userdata.name}</span>,</p>
              <p>We have received your order and it is being processed.</p>
      
              <h3>Order Details:</h3>
              <table class="order-items">
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
                ${cartItems
                  .map(
                    (item) => `
                    <tr>
                      <td>${item.i_name}</td>
                      <td>${item.i_quantity}</td>
                      <td>₹${item.i_price * item.i_quantity}</td>
                    </tr>
                  `
                  )
                  .join("")}
              </table>
      
              <p class="total">Total: ₹${cartItems.reduce(
                (total, item) => total + item.i_price * item.i_quantity,
                0
              )}</p>
      
              <h3>Delivery Address:</h3>
              <p>${userdata.address}</p>
      
              <div class="footer">
                <p>If you have any questions, please contact our support team. 📩</p>
                <p>Happy Shopping! 🛍️</p>
              </div>
            </div>
          </body>
        </html>
        `,
      };      

      // Admin's Email Data that will be forwared to the admin
      const adminEmailData = {
        to: adminEmail,
        subject: "Order Confirmation",
        body: `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; color: #333; }
              .container { max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
              h2 { color: #007bff; }
              .details { margin-bottom: 10px; }
              .order-items { border-collapse: collapse; width: 100%; margin-top: 10px; }
              .order-items th, .order-items td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              .total { font-weight: bold; color: #d9534f; margin-top: 10px; }
              .footer { margin-top: 20px; font-size: 12px; color: #777; }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Order Confirmation</h2>
              <p><strong>An order has been placed by ${userdata.name}!</strong></p>
              
              <div class="details">
                <p>📧 <strong>Email:</strong> ${userdata.email}</p>
                <p>📞 <strong>Phone:</strong> ${userdata.phone}</p>
              </div>
      
              <h3>Order Details:</h3>
              <table class="order-items">
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
                ${cartItems
                  .map(
                    (item) => `
                    <tr>
                      <td>${item.i_name}</td>
                      <td>${item.i_quantity}</td>
                      <td>₹${item.i_price * item.i_quantity}</td>
                    </tr>
                  `
                  )
                  .join("")}
              </table>
      
              <p class="total">Total: ₹${cartItems.reduce(
                (total, item) => total + item.i_price * item.i_quantity,
                0
              )}</p>
      
              <h3>Shipping Address:</h3>
              <p>${userdata.address}</p>
      
              <div class="footer">
                <p>Thank you for your order! 🚀</p>
              </div>
            </div>
          </body>
        </html>
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
