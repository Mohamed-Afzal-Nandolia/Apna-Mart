import { Link } from "react-router-dom";
// import { Badge } from "/components/ui/badge"
// import img from "D:/Downloads/Welcome.jpeg";
// import img from "../assets/images/Welcome.jpeg";

export const HomePage = () => {
  const items = [
    {
        "i_id": 4,
        "i_name": "Friends",
        "i_price": 2000,
        "i_image_path": "D:/GitHub/All Repositories/Apna-Mart/backend/src/main/java/images/friends.jpg",
        "i_type": "Entertainment",
        "i_quantity": 200,
        "i_description": "Good tv series",
        "i_availability": true
    },
    {
        "i_id": 16,
        "i_name": "Baygan",
        "i_price": 100,
        "i_image_path": null,
        "i_type": null,
        "i_quantity": 15,
        "i_description": "Baygan added for testing purposes",
        "i_availability": true
    },
    {
        "i_id": 23,
        "i_name": "Fresh Pomegranate (Anar)",
        "i_price": 410,
        "i_image_path": "D:\\GitHub\\All Repositories\\Apna-Mart\\backend\\src\\main\\java\\images\\c6f403eb-d1a1-4f65-a019-c9fd087636e6Fresh Pomegranate (Anar).jpg",
        "i_type": "image/jpeg",
        "i_quantity": 4,
        "i_description": "Highly sweet and nutty, pomegranates are packed with multiple health benefits. ",
        "i_availability": true
    },
    {
        "i_id": 24,
        "i_name": "Fresh Watermelon (Tarbooj)",
        "i_price": 160,
        "i_image_path": "D:\\GitHub\\All Repositories\\Apna-Mart\\backend\\src\\main\\java\\images\\65e41629-9666-4e21-9c5e-52507362dce5Fresh Watermelon.jpg",
        "i_type": "image/jpeg",
        "i_quantity": 5,
        "i_description": "Relish the juicy taste of fresh watermelon. Slice and enjoy every bite or make fresh watermelon juice. You can also use watermelon to make desserts like ice cream. Watermelon seeds can also be dried, roasted and consumed.",
        "i_availability": true
    },
    {
        "i_id": 25,
        "i_name": "Apple Royal Gala (Seb)",
        "i_price": 254,
        "i_image_path": "D:\\GitHub\\All Repositories\\Apna-Mart\\backend\\src\\main\\java\\images\\a87f4d87-139d-472a-b316-ee7a67269346Apple Royal Gala (Seb).jpg",
        "i_type": "image/jpeg",
        "i_quantity": 8,
        "i_description": "An Apple a day keeps the doctor away. Red Delicious Apples are crunchy juicy and sweet. They are extremely beneficial for your family's health. They are a good source of Fibre and contain valuable anti-oxidants and poly-nutrients.",
        "i_availability": true
    },
    {
        "i_id": 26,
        "i_name": "Fresh Banana (Kela)",
        "i_price": 89,
        "i_image_path": "D:\\GitHub\\All Repositories\\Apna-Mart\\backend\\src\\main\\java\\images\\f9d225bd-b5ba-43d9-9259-e72816e1cb60Fresh Banana (Kela).jpg",
        "i_type": "image/jpeg",
        "i_quantity": 9,
        "i_description": "Enjoy the taste of banana elaichi or Yelakki, which is consumed across the world for its distinctive flavour and taste.",
        "i_availability": true
    },
    {
        "i_id": 27,
        "i_name": "Fresh Papaya (Papita)",
        "i_price": 88,
        "i_image_path": "D:\\GitHub\\All Repositories\\Apna-Mart\\backend\\src\\main\\java\\images\\c77d6291-509e-488e-bdd2-02743b5df57eFresh Papaya (Papita).jpg",
        "i_type": "image/jpeg",
        "i_quantity": 10,
        "i_description": "Packed with nutrition, papaya is a healthy addition to your daily quota of fruit consumption. Relish its sweet and fresh flavours!",
        "i_availability": true
    },
    {
        "i_id": 28,
        "i_name": "Fresh Pineapple (Ananas)",
        "i_price": 108,
        "i_image_path": "D:\\GitHub\\All Repositories\\Apna-Mart\\backend\\src\\main\\java\\images\\ee750889-2a08-46a0-9a30-e4570d774bd5Fresh Pineapple (Ananas).jpg",
        "i_type": "image/jpeg",
        "i_quantity": 12,
        "i_description": "While we work to ensure that the product information is correct, actual product packaging and material may contain more or different information from what is given here.",
        "i_availability": true
    },
    {
        "i_id": 29,
        "i_name": "Avocado Hass Premium Imported",
        "i_price": 130,
        "i_image_path": "D:\\GitHub\\All Repositories\\Apna-Mart\\backend\\src\\main\\java\\images\\775e5a08-f151-41b5-b28f-8b4042c6683fAvocado Hass Premium Imported.jpg",
        "i_type": "image/jpeg",
        "i_quantity": 6,
        "i_description": "Avocados are a versatile and nutritious fruit that has gained immense popularity in recent years. Known for their creamy texture and rich flavour, avocados have become a staple ingredient in many households.",
        "i_availability": true
    },
    {
        "i_id": 30,
        "i_name": "Fresh Muskmelon (Kharbooja)",
        "i_price": 125,
        "i_image_path": "D:\\GitHub\\All Repositories\\Apna-Mart\\backend\\src\\main\\java\\images\\0a65d864-45fa-446a-aa88-c1bed0d0be40Fresh Muskmelon (Kharbooja).jpg",
        "i_type": "image/jpeg",
        "i_quantity": 11,
        "i_description": "The most versatile melon around and aptly named honeydew is both sweet and succulent. Its celery-coloured flesh looks like a green-tinged precious stone.",
        "i_availability": true
    },
    {
        "i_id": 31,
        "i_name": "Fresh Kiwi",
        "i_price": 170,
        "i_image_path": "D:\\GitHub\\All Repositories\\Apna-Mart\\backend\\src\\main\\java\\images\\25994d5b-e10c-44c1-a8e7-451f1e85ce66Fresh Kiwi.jpg",
        "i_type": "image/jpeg",
        "i_quantity": 3,
        "i_description": "While we work to ensure that the product information is correct, actual product packaging and material may contain more or different information from what is given here.",
        "i_availability": true
    }
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
            {items.map((item) => (
              <div
                key={item.i_id}
                className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="absolute inset-0 z-10">
                  <Link to="#" className="absolute inset-0">
                    <span className="sr-only">View {item.i_name}</span>
                  </Link>
                </div>
                <img
                  src={item.i_image_path}
                  alt={item.i_name}
                  width={400}
                  height={300}
                  className="h-64 w-full object-cover"
                  style={{ aspectRatio: "400/300", objectFit: "cover" }}
                />
                <div className="bg-background p-4">
                  <h3 className="text-xl font-bold">{item.i_name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.i_description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-lg font-semibold">${item.i_price}</div>
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

