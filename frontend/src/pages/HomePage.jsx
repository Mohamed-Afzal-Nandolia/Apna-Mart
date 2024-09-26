import { Link } from "react-router-dom";
// import { Badge } from "/components/ui/badge"
import img from "C:/Users/efufo/Downloads/welcome.png";

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
          <img
            src={img}
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
                  src={img}
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
    </div>
  );
};

// import { useState, useEffect } from "react"
// import Link from "react-router-dom"
// // import { Badge } from "@/components/ui/badge"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"

// export default function Component() {
//   const [products, setProducts] = useState([])
//   useEffect(() => {
//     fetch("/api/products")
//       .then((response) => response.json())
//       .then((data) => setProducts(data))
//   }, [])
//   return (
//     <div className="flex flex-col">
//       <section className="bg-primary text-primary-foreground py-20 md:py-32">
//         <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
//           <div className="space-y-6">
//             <h1 className="text-4xl md:text-5xl font-bold">Fresh Groceries Delivered to Your Door</h1>
//             <p className="text-lg md:text-xl">
//               Discover the best local produce, meats, and pantry staples delivered straight to your home.
//             </p>
//             <Link
//               href="#"
//               className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-6 text-sm font-medium text-primary shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//               prefetch={false}
//             >
//               Shop Now
//             </Link>
//           </div>
//           <img
//             src="/placeholder.svg"
//             alt="Fresh Groceries"
//             width={600}
//             height={400}
//             className="rounded-lg object-cover"
//             style={{ aspectRatio: "600/400", objectFit: "cover" }}
//           />
//         </div>
//       </section>
//       <section className="py-12 md:py-20">
//         <div className="container mx-auto px-4 md:px-6">
//           <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Products</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
//             {products.map((product) => (
//               <div key={product.id} className="bg-background rounded-lg shadow-lg overflow-hidden">
//                 <img
//                   src="/placeholder.svg"
//                   alt={product.name}
//                   width={400}
//                   height={300}
//                   className="w-full h-48 object-cover"
//                   style={{ aspectRatio: "400/300", objectFit: "cover" }}
//                 />
//                 <div className="p-4">
//                   <h3 className="text-lg font-bold mb-2">{product.name}</h3>
//                   <p className="text-muted-foreground mb-4">{product.description}</p>
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="text-lg font-bold">${product.price}</div>
//                     <Badge variant={product.inStock ? "success" : "danger"} className="text-sm">
//                       {product.inStock ? "In Stock" : "Out of Stock"}
//                     </Badge>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Button variant="outline" size="sm" className="flex-1" disabled={!product.inStock}>
//                       Add to Cart
//                     </Button>
//                     <Input
//                       type="number"
//                       min={1}
//                       max={10}
//                       defaultValue={1}
//                       className="w-20 h-8 text-center"
//                       disabled={!product.inStock}
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }
