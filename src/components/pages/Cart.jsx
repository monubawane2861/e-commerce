import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Trash2, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-medium text-gray-900">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-6">
          You haven't added any products yet.
        </p>
        <Link
          to="/products"
          className="bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-[5%] mt-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Shopping Cart</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Table */}
        <div className="md:w-2/3 bg-white rounded-lg shadow-md overflow-auto mb-6">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-3">Product</th>
                <th className="text-center px-6 py-3">Price</th>
                <th className="text-center px-6 py-3">Qty</th>
                <th className="text-center px-6 py-3">Subtotal</th>
                <th className="text-right px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const discounted =
                  item.price * (1 - (item.discountPercentage || 0) / 100);
                const subtotal = discounted * item.quantity;

                return (
                  <tr key={item.id} className="border-t">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-16 w-16 rounded mr-4"
                        />
                        <div>
                          <Link
                            to={`/products/${item.id}`}
                            className="text-emerald-600 hover:underline"
                          >
                            {item.title}
                          </Link>
                          <p className="text-xs text-gray-500">{item.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center px-6 py-4">
                      <div>
                        <span>${discounted.toFixed(2)}</span>
                        {item.discountPercentage > 0 && (
                          <div className="text-xs line-through text-gray-400">
                            ${item.price.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="text-center px-6 py-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 bg-gray-200 rounded-l"
                          aria-label="Decrease quantity"
                        >
                          -
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
                          className="w-12 text-center border-t border-b"
                        />
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 bg-gray-200 rounded-r"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-center px-6 py-4 font-medium">
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

        {/* Summary Section */}
        <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Cart Summary
          </h2>

          <div className="flex justify-between mb-2">
            <span>Items ({cart.length}):</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-bold text-emerald-600 mb-6">
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>

          <button className="w-full bg-emerald-600 text-white py-3 rounded-md hover:bg-emerald-700">
            Proceed to Checkout
          </button>

          <Link
            to="/products"
            className="block text-center text-emerald-600 hover:underline mt-4"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
