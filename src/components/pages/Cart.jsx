import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Trash2, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven’t added anything yet.
        </p>
        <Link
          to="/products"
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-emerald-700 transition duration-300"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-[5%] mt-16 mb-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        🛒 Your Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 🛍️ Cart Items Table */}
        <div className="lg:w-2/3 bg-white rounded-2xl shadow-lg overflow-x-auto p-4">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-100 rounded-t-lg">
              <tr className="text-gray-600 uppercase text-xs">
                <th className="text-left px-6 py-3">Product</th>
                <th className="text-center px-6 py-3">Price</th>
                <th className="text-center px-6 py-3">Quantity</th>
                <th className="text-center px-6 py-3">Subtotal</th>
                <th className="text-right px-6 py-3">Remove</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item) => {
                const discount = item.discountPercentage || 0;
                const finalPrice = item.price * (1 - discount / 100);
                const subtotal = finalPrice * item.quantity;

                return (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-16 w-16 rounded-lg mr-4 shadow"
                        />
                        <div>
                          <Link
                            to={`/products/${item.id}`}
                            className="text-emerald-600 font-medium hover:underline"
                          >
                            {item.title}
                          </Link>
                          <p className="text-xs text-gray-500">{item.brand}</p>
                        </div>
                      </div>
                    </td>

                    <td className="text-center px-6 py-4">
                      <div>
                        <span className="text-lg font-semibold text-gray-800">
                          ${finalPrice.toFixed(2)}
                        </span>
                        {discount > 0 && (
                          <div className="text-xs line-through text-red-400">
                            ${item.price.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="text-center px-6 py-4">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 bg-gray-200 rounded hover:bg-gray-300 text-lg"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-12 text-center border rounded"
                        />
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 bg-gray-200 rounded hover:bg-gray-300 text-lg"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="text-center px-6 py-4 font-medium text-gray-700">
                      ${subtotal.toFixed(2)}
                    </td>

                    <td className="text-right px-6 py-4">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ✅ Order Summary Section */}
        <div className="lg:w-1/3 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Order Summary
          </h2>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-700">
              <span>Items in Cart</span>
              <span>{cart.length}</span>
            </div>
            <div className="flex justify-between text-gray-700 font-medium">
              <span>Total Amount</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
          </div>

          <hr className="my-4" />

          <button className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition">
            Proceed to Checkout
          </button>

          <Link
            to="/products"
            className="block text-center text-emerald-600 mt-4 hover:underline"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
