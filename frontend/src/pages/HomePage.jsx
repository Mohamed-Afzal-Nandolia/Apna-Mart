import { Link } from "react-router-dom";
import { useAllItems } from "../hooks/useAllItems";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { CartOverlay } from "../components/CartOverlay";
import bannerImg from "../assets/groceries.jpg"
import { useCartItems } from "../hooks/useCartItems";
import { Loading } from "./Loading";
import { DiscoverSection } from "../components/DiscoverSection";


export const HomePage = () => {
  const { allItems, loading, error } = useAllItems();
  const [ isCartOpen, setIsCartOpen ] = useState(false);
  const { cartItems, updateCartItems } = useCartItems();

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  
  if (loading) return <Loading />;

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  }

  return (
    <div className="flex flex-col">
      <Header toggleCart={toggleCart} cartItemsCount={cartItems.length} />
      <CartOverlay 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        updateCartItems={updateCartItems}
      />
      <section className="bg-primary text-primary-foreground py-20 md:py-32">
      
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-main-blue">
              Fresh Groceries Delivered to Your Door
            </h1>
            <p className="text-lg md:text-xl text-main-green">
              Discover the best local produce, meats, and pantry staples
              delivered straight to your home.
            </p>
            <Link
              href="#"
              className="text-main-blue inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-6 text-sm font-medium text-primary shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 "
              prefetch={false}
            >
              Shop Now
            </Link>
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
        <section className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-main-blue">
              Discover Our Organic Grocery Selection
            </h1>
            <p className="mt-2 text-main-green">
              Explore our wide range of high-quality, sustainable products.
            </p>
          </div>
          <DiscoverSection allItems={allItems} />  
        </section>
      </main>
    </div>
  );
};
