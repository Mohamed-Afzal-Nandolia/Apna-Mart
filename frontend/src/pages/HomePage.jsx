// import { Link } from "react-router-dom";
import { useAllItems } from "../hooks/useAllItems";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { CartOverlay } from "../components/CartOverlay";
import bannerImg from "../assets/groceries.jpg"
import { useCartItems } from "../hooks/useCartItems";
import { Loading } from "./Loading";
import { DiscoverSection } from "../components/DiscoverSection";
import { useRef } from "react";
// import { validateToken } from "../services/Apis";


export const HomePage = () => {
  const { allItems, loading, error } = useAllItems();
  const [ isCartOpen, setIsCartOpen ] = useState(false);
  const { cartItems, updateCartItems } = useCartItems();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  // const [hasToken, setHasToken] = useState(true);
  // const [tokenValid, setTokenValid] = useState(false);
  const discoverSectionRef = useRef(null);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  
  useEffect(() => {
    setCartItemsCount(cartItems.length);
  }, [cartItems]);

  // useEffect(() => {
  //   const checkToken = async () => {
  //       try {
  //         const response = await validateToken();
  //         console.log("Call has been done and ", response.data);
  //         setHasToken(true); // Token is present
  //         setTokenValid(true); // Token is valid
  //       } catch (error) {
  //         console.error("Call has been done and ", error.response?.data);
  //         setTokenValid(false); // Token is invalid
  //       }
  //   };

  //   const token = localStorage.getItem("Authorization");
  //   if (token) {
  //       checkToken(); // Validate the token if it exists
  //   } else {
  //       setHasToken(false); // No token found
  //       //console.log("TOKEN IS INVALID");
  //   }
  // }, []);
 
  if (loading) return <Loading />;

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  }

  // if (tokenValid === false && hasToken === true) {
  //   return (
  //     <div className="flex flex-col pt-16">
  //       <Header toggleCart={toggleCart} cartItemsCount={cartItemsCount} />
  //       <CartOverlay
  //         isOpen={isCartOpen}
  //         onClose={() => setIsCartOpen(false)}
  //         cartItems={cartItems}
  //         updateCartItems={updateCartItems}
  //       />
  //       <div className="container mx-auto px-4 py-12">
  //         <p className="text-center text-red-500">
  //           Your session has expired or the token is invalid. Please try logging in again.
  //         </p>
  //         {/* Optionally, redirect or show a login button here */}
  //       </div>
  //     </div>
  //   );
  // }

  const scrollToDiscover = () => {
    discoverSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col pt-16">
      <Header toggleCart={toggleCart} cartItemsCount={cartItemsCount} />
      <CartOverlay 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        updateCartItems={updateCartItems}
      />
      <section className="bg-primary text-primary-foreground py-20 md:py-32 ">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-main-blue">
              Fresh Groceries Delivered to Your Door
            </h1>
            <p className="text-lg md:text-xl text-main-green">
              Discover the best local produce, meats, and pantry staples
              delivered straight to your home.
            </p>
            <button
              onClick={scrollToDiscover}
              className="text-main-blue inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-6 text-sm font-medium text-primary shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Shop Now
            </button>
          </div>
          <img
            src={bannerImg}
            alt="Fresh Groceries"
            width={600}
            height={400}
            className="rounded-lg object-cover"
            style={{ aspectRatio: "600/400", objectFit: "cover" }}
          />
        </div>
      </section>
      <main className="bg-background">
        <section ref={discoverSectionRef} className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
          
          <DiscoverSection 
            allItems={allItems} 
            cartItems={cartItems} 
            updateCartItems={updateCartItems}
          />  
        </section>
      </main>
    </div>
  );
};
