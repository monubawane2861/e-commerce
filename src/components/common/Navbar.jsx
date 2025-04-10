import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Package, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { getCartItemsCount } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinkClass =
    "hover:text-emerald-600 font-medium transition-colors flex items-center";

  return (
    <nav className="bg-black text-white shadow-lg fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-emerald-600 transition-colors"
          >
            <p>
              <span className="text-emerald-600 text-3xl">E</span> &nbsp;Shopper
            </p>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/products"
              className={navLinkClass}
              aria-current={isActive("/products") ? "page" : undefined}
            >
              <Package className="h-6 w-6 mr-1" />
              Products
            </Link>

            <Link
              to="/cart"
              className={navLinkClass}
              aria-current={isActive("/cart") ? "page" : undefined}
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="ml-1 bg-emerald-600 text-white rounded-full px-2 py-0.5 text-xs">
                {getCartItemsCount()}
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Link to="/cart" className="mr-4">
              <div className="relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white rounded-full px-2 py-0.5 text-xs">
                  {getCartItemsCount()}
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 py-4">
          <div className="container mx-auto px-4">
            <Link
              to="/products"
              className="block py-2 px-4 text-white hover:bg-gray-800 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Products
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
