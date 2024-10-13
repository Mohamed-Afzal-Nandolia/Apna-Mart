import {  useState } from "react";

export const useCartItems = () => {
  const [cartItems, setCartItems] = useState(() => {
    const localCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    return localCartItems;
  });

  const updateCartItems = (newCartItems) => {
    console.log("Updating cart items:", newCartItems);
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  return { cartItems, updateCartItems };
};


// [
//   {
//     "i_id": "nfpeoin1ilaubegiujba2094u",
//     "i_name": "Fresh Pomegranate (Anar)",
//     "i_price": 410,
//     "i_quantity": 4,
//     "i_description":
//       "Highly sweet and nutty, pomegranates are packed with multiple health benefits. ",
//     "i_availability": true,
//   },
//   {
//     "i_id": "ngq934htpw9q3h4tifuabweliop98",
//     "i_name": "Fresh Watermelon (Tarbooj)",
//     "i_price": 160,
//     "i_quantity": 5,
//     "i_description":
//       "Relish the juicy taste of fresh watermelon. Slice and enjoy every bite or make fresh watermelon juice. You can also use watermelon to make desserts like ice cream. Watermelon seeds can also be dried, roasted and consumed.",
//     "i_availability": true,
//   },
//   {
//     "i_id": "nfpeoin12iou4nbhnpw4io3h094u",
//     "i_name": "Avocado Hass Premium Imported",
//     "i_price": 130,
//     "i_quantity": 6,
//     "i_description":
//       "Avocados are a versatile and nutritious fruit that has gained immense popularity in recent years. Known for their creamy texture and rich flavour, avocados have become a staple ingredient in many households.",
//     "i_availability": true,
//   },
// ]
