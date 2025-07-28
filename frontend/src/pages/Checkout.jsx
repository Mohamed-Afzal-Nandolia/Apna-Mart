import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartItems } from "../hooks/useCartItems";
import { Header } from "../components/Header";
import { Loading } from "./Loading";
import { getAmount, placeOrder } from "../services/Apis";
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";

export const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, updateCartItems } = useCartItems();
  const [isLoading, setIsLoading] = useState(true);
  const [minOrderAmount, setMinOrderAmount] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.i_price * item.i_quantity,
    0
  );

  // Check if all fields are filled
  const isFormValid =
    minOrderAmount !== null && // Ensure minOrderAmount is fetched
      Object.values(formData).every((value) => value.trim() !== "") &&
        formData.phone.length === 10 &&
          totalPrice >= minOrderAmount;

    
  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  useEffect(() => {
    const fetchMinOrderAmount = async () => {
      try {
        const adminId = 8; // HARD CODED ADMIN ID
        const response = await getAmount(adminId);
        setMinOrderAmount(response.data); // Assuming the response contains `amount`

        if(totalPrice < response.data){
          toast.error(`Minimum order amount should be ₹${response.data}`);
        }
        
      } catch (error) {
        console.error("Failed to fetch minimum order amount:", error);
        setMinOrderAmount(0); // Fallback to a safe value in case of error
      }
    };
  
    fetchMinOrderAmount();
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!isFormValid) return;

  localStorage.setItem("shippingDetails", JSON.stringify(formData));

    // Step 1: Build a combined item name
  const combinedItemName = cartItems
    .map(item => `${item.i_name} x ${item.i_quantity}`)
    .join(", ");

  // Step 2: Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.i_price * item.i_quantity,
    0
  );

  // Step 3: Build single object payload
  const orderDetails = {
    i_name: combinedItemName,
    i_price: totalPrice.toString(), // Convert to string if backend expects string
    i_quantity: "1", // Since we're aggregating into one virtual item
    shippingDetails: formData
  };

  try {
    const data = await placeOrder(orderDetails); // call API function
    console.log(data)
    if (data.status === "Success" && data.sessionUrl) {
      window.location.href = data.sessionUrl; // Redirect to Stripe Checkout
    } else {
      console.error("Payment session creation failed:", data);
      toast.error("Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error("Checkout failed:", error);
    toast.error("Checkout failed. Try again later.");
  }
};


  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <Header cartItemsCount={cartItems.length} />
      <main className="flex-grow bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-main-blue mb-8">Checkout</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-main-green mb-4">Order Summary</h2>
              {cartItems.map((item) => (
                <div key={item.i_id} className="flex justify-between items-center mb-2">
                  <span>
                    {item.i_name} x {item.i_quantity}
                  </span>
                  <span>₹{(item.i_price * item.i_quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-4">
                <div className="flex justify-between items-center font-semibold">
                  <span>Total:</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-main-green mb-4">Shipping Details</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    required
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number (10 digits)"
                    required
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    required
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Shipping Address"
                    required
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      required
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="ZIP Code"
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className={`mt-6 w-full bg-main-green text-white py-2 px-4 rounded hover:bg-main-green/90 transition-colors ${
                    isFormValid ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!isFormValid}
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
