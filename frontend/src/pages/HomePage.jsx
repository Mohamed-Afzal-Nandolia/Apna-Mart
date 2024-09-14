import { Link } from "react-router-dom";
// import { Badge } from "/components/ui/badge"

export const HomePage = () => {
  const items = [
    {
      id: 1,
      name: "Organic Kale",
      description: "Fresh, nutrient-rich kale",
      price: 3.99,
      inStock: true,
      quantity: 15,
    },
    {
      id: 2,
      name: "Artisanal Sourdough Bread",
      description: "Handcrafted, slow-fermented bread",
      price: 5.99,
      inStock: true,
      quantity: 8,
    },
    {
      id: 3,
      name: "Grass-Fed Beef",
      description: "Locally sourced, hormone-free beef",
      price: 12.99,
      inStock: true,
      quantity: 20,
    },
    {
      id: 4,
      name: "Organic Blueberries",
      description: "Plump, juicy blueberries",
      price: 4.99,
      inStock: false,
      quantity: 0,
    },
    {
      id: 5,
      name: "Free-Range Eggs",
      description: "Ethically sourced, farm-fresh eggs",
      price: 6.99,
      inStock: true,
      quantity: 12,
    },
    {
      id: 6,
      name: "Heirloom Tomatoes",
      description: "Vibrant, flavorful tomatoes",
      price: 3.99,
      inStock: true,
      quantity: 18,
    },
    {
      id: 7,
      name: "Organic Quinoa",
      description: "Nutrient-dense, gluten-free grain",
      price: 4.99,
      inStock: true,
      quantity: 25,
    },
    {
      id: 8,
      name: "Wild-Caught Salmon",
      description: "Sustainably sourced, high-quality salmon",
      price: 14.99,
      inStock: true,
      quantity: 10,
    },
  ];

  return (
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
          {items.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="absolute inset-0 z-10">
                <Link to="#" className="absolute inset-0">
                  <span className="sr-only">View {item.name}</span>
                </Link>
              </div>
              <img
                src="/placeholder.svg"
                alt={item.name}
                width={400}
                height={300}
                className="h-64 w-full object-cover"
                style={{ aspectRatio: "400/300", objectFit: "cover" }}
              />
              <div className="bg-background p-4">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-lg font-semibold">${item.price}</div>
                  {/* <Badge
                        variant={item.inStock ? "success" : "danger"}
                        className="rounded-full px-3 py-1 text-xs font-medium"
                      >
                        {item.inStock ? `In Stock (${item.quantity})` : "Out of Stock"}
                      </Badge> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
