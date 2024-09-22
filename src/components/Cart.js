import React, { useState, useEffect } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from the backend
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/cart"); // Replace with your API URL
        if (response.ok) {
          const data = await response.json();
          setCartItems(data); // Assuming your API returns an array of cart items
        } else {
          console.error("Failed to fetch cart items");
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);
  console.log(cartItems)
  const handleQuantity = (id, action) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === "increment"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

      <div className="flex flex-col lg:flex-row justify-between gap-6">
        {/* Cart Items */}
        <div className="w-full lg:w-3/4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-4 mb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500">${item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantity(item.id, "decrement")}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantity(item.id, "increment")}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="w-full lg:w-1/4 bg-gray-100 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>$10.00</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${(calculateTotal() + 10).toFixed(2)}</span>
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
