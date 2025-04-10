import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Star, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  // Simplified image navigation
  const navigateImage = (direction) => {
    if (product && product.images.length > 0) {
      setActiveImageIndex((prevIndex) => {
        const newIndex =
          (prevIndex + direction + product.images.length) %
          product.images.length;
        return newIndex;
      });
    }
  };

  const discountedPrice = product
    ? product.price * (1 - product.discountPercentage / 100)
    : 0;

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="md:flex">
          {/* Image Section */}
          <div className="md:w-1/2 w-full relative">
            <div className="relative h-96">
              <img
                src={product?.images[activeImageIndex]}
                alt={product?.title}
                className="w-full h-full object-contain rounded-tl-lg rounded-bl-lg"
              />

              {product?.images?.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage(-1)}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/75 hover:bg-gray-200 text-gray-700 p-2 rounded-full shadow-md transition-colors duration-200"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => navigateImage(1)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/75 hover:bg-gray-200 text-gray-700 p-2 rounded-full shadow-md transition-colors duration-200"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {product?.images?.length > 1 && (
              <div className="flex overflow-x-auto p-2 gap-2 bg-gray-50">
                {product?.images?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product?.title} thumbnail ${index}`}
                    className={`h-16 w-16 object-cover cursor-pointer rounded-md transition-shadow duration-300 ${
                      activeImageIndex === index
                        ? "shadow-lg shadow-emerald-600 border-2 border-emerald-600"
                        : "border border-gray-200 hover:shadow-md"
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="md:w-1/2 w-full p-8">
            {" "}
            {/* Responsive width */}
            <div className="flex items-center mb-4">
              <span className="bg-blue-100 text-emerald-600 text-xs px-2 py-1 rounded-full font-semibold mr-2">
                {product?.category}
              </span>
              <span className="text-gray-600 text-sm">{product?.brand}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
              {product?.title}
            </h1>
            <div className="flex items-center mb-5">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5"
                    fill={
                      i < Math.round(product?.rating) ? "currentColor" : "none"
                    }
                  />
                ))}
              </div>
              <span className="text-gray-700">{product?.rating} stars</span>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product?.description}
            </p>
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-4xl font-bold text-emerald-600 mr-3">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product?.discountPercentage > 0 && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ${product?.price.toFixed(2)}
                    </span>
                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                      {product?.discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-emerald-600 text-sm mt-1">
                In Stock: {product?.stock} units
              </p>
            </div>
            {/* Quantity */}
            <div className="flex items-center mb-7">
              <label
                htmlFor="quantity"
                className="mr-4 text-gray-700 font-medium"
              >
                Quantity:
              </label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() =>
                    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1))
                  } //Simplified quantity decrement
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-200 transition-colors duration-200 text-gray-700"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="w-20 py-2 text-center border-l border-r border-gray-300 focus:outline-none"
                />
                <button
                  onClick={() =>
                    setQuantity((prevQuantity) => prevQuantity + 1)
                  } // Simplified quantity increment
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-200 transition-colors duration-200 text-gray-700"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full bg-emerald-600 text-white py-3 rounded-md font-semibold transition-colors duration-300 flex items-center justify-center" //Updated Color
            >
              Add to Cart <ShoppingCart className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
