import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Package } from "lucide-react"; //Imported Package Icon
import { useLocation } from "react-router-dom"; // Import useLocation hook

const Navbar = () => {
  const { getCartItemsCount } = useCart();
  const location = useLocation(); // Get the current location

  const navLinkClass =
    "hover:text-emerald-600 font-medium transition-colors flex items-center"; // added flex for icon alignment

  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-emerald-600 transition-colors"
          >
            <p>
              <span className="text-emerald-600 text-3xl">E</span> &nbsp;
              Shopper
            </p>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/products"
              className={navLinkClass}
              aria-current={
                location.pathname === "/products" ? "page" : undefined
              } // Mark as current page
            >
              <Package className="h-6 w-6 mr-1" aria-hidden="true" />{" "}
              {/* Added Icon */}
              Products
            </Link>
            <Link
              to="/cart"
              className={navLinkClass}
              aria-current={location.pathname === "/cart" ? "page" : undefined} // Mark as current page
            >
              <ShoppingCart className="h-6 w-6" aria-label="Cart" />{" "}
              {/* Added aria-label */}
              <span className="ml-1 bg-emerald-600 text-white rounded-full px-2 py-0.5 text-xs">
                {getCartItemsCount()}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
