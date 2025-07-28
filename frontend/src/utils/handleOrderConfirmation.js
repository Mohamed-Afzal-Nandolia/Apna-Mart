import { postEmail, postSms } from "../services/Apis";

export const handleOrderConfirmation = async ({ cartItems, userData, updateCartItems }) => {
    const userdata = JSON.parse(localStorage.getItem("shippingDetails"));
  try {
    let adminEmail = "m45474516@gmail.com";

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

    // Optional SMS (commented out)
    // const userSmsData = {
    //   phoneNumber: "+91" + userData.phone,
    //   message: "Your order was successful. Thank you!",
    // };

    await postEmail(userEmailData);
    await postEmail(adminEmailData);
    // await postSms(userSmsData);
    // await postSms(adminSmsData);

    updateCartItems([]);
    return true;
  } catch (error) {
    console.error("Order confirmation error:", error);
    return false;
  }
};
