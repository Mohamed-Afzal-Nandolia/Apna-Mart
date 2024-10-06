import { Link } from "react-router-dom";
import { useAllItems } from "../hooks/useAllItems";
import { useEffect } from "react";
import { Badge } from "flowbite-react";


export const HomePage = () => {
  const {allItems, loading, error} = useAllItems();
  
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  
  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;


  return (
    <div className="flex flex-col">
      <section className="bg-primary text-primary-foreground py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Fresh Groceries Delivered to Your Door
            </h1>
            <p className="text-lg md:text-xl">
              Discover the best local produce, meats, and pantry staples
              delivered straight to your home.
            </p>
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-6 text-sm font-medium text-primary shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Shop Now
            </Link>
          </div>
          {/* <img
            src={img}
            alt="Fresh Groceries"
            width={600}
            height={400}
            className="rounded-lg object-cover"
            style={{ aspectRatio: "600/400", objectFit: "cover" }}
          /> */}
        </div>
      </section>
      <main className="bg-background">
        <section className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Discover Our Organic Grocery Selection
            </h1>
            <p className="mt-2 text-muted-foreground">
              Explore our wide range of high-quality, sustainable products.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {allItems.map((item) => (
              <div
                key={item.i_id}
                className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="absolute inset-0 z-10">
                  <Link to="#" className="absolute inset-0">
                    <span className="sr-only">View {item.i_name}</span>
                  </Link>
                </div>
                <div className="flex justify-center">
                  <img
                    src={item.i_image_path}
                    alt={item.i_name}
                    width={400}
                    height={300}
                    className="h-64 w-64 object-cover"
                    style={{ aspectRatio: "400/300" }}
                  />
                </div>
                <div className="bg-background p-4">
                  <h3 className="text-xl font-bold">{item.i_name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.i_description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-lg font-semibold">₹{item.i_price}</div>
                    <Badge
                      variant={item.i_availability ? "success" : "danger"}
                      className="rounded-full px-3 py-1 text-xs font-medium"
                    >
                      {item.i_availability ? `In Stock (${item.i_quantity})` : "Out of Stock"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
