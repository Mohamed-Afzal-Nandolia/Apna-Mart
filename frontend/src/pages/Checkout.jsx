import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartItems } from "../hooks/useCartItems";
import { Header } from "../components/Header";
import { Loading } from "./Loading";

export const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, updateCartItems } = useCartItems();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.i_price * item.i_quantity,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically process the payment and order
    console.log("Order submitted:", { formData, cartItems, totalPrice });
    // Clear cart and redirect to a confirmation page
    updateCartItems([]);
    navigate("/order-confirmation");
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemsCount={cartItems.length}/>
      <main className="flex-grow bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-main-blue mb-8">Checkout</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-main-green mb-4">Order Summary</h2>
              {cartItems.map((item) => (
                <div key={item.i_id} className="flex justify-between items-center mb-2">
                  <span>{item.i_name} x {item.i_quantity}</span>
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
                  className="mt-6 w-full bg-main-green text-white py-2 px-4 rounded hover:bg-main-green/90 transition-colors"
                  onClick={() => navigate("/payment")}
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
