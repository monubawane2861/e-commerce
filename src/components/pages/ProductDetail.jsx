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
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const changeQuantity = (val) => {
    setQuantity((prev) => Math.max(1, prev + val));
  };

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val > 0) setQuantity(val);
  };

  const discountedPrice = product
    ? product.price * (1 - product.discountPercentage / 100)
    : 0;

  const navigateImage = (dir) => {
    if (!product?.images?.length) return;
    setActiveImageIndex(
      (prev) => (prev + dir + product.images.length) % product.images.length
    );
  };

  const handleAddToCart = () => {
    if (product) addToCart(product, quantity);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 mt-20">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="md:flex">
          {/* Image Section */}
          <div className="md:w-1/2 w-full relative">
            <div className="relative h-96">
              <img
                src={product.images[activeImageIndex]}
                alt={product.title}
                className="w-full h-full object-contain rounded-tl-lg rounded-bl-lg"
              />

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage(-1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/75 hover:bg-gray-200 text-gray-700 p-2 rounded-full shadow-md"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => navigateImage(1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/75 hover:bg-gray-200 text-gray-700 p-2 rounded-full shadow-md"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex overflow-x-auto p-2 gap-2 bg-gray-50">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`thumbnail-${i}`}
                    onClick={() => setActiveImageIndex(i)}
                    className={`h-16 w-16 object-cover cursor-pointer rounded-md ${
                      activeImageIndex === i
                        ? "shadow-lg shadow-emerald-600 border-2 border-emerald-600"
                        : "border border-gray-200 hover:shadow-md"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Detail Section */}
          <div className="md:w-1/2 w-full p-8">
            <div className="flex items-center mb-4">
              <span className="bg-blue-100 text-emerald-600 text-xs px-2 py-1 rounded-full font-semibold mr-2">
                {product.category}
              </span>
              <span className="text-gray-600 text-sm">{product.brand}</span>
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
              {product.title}
            </h1>

            <div className="flex items-center mb-5">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5"
                    fill={
                      i < Math.round(product.rating) ? "currentColor" : "none"
                    }
                  />
                ))}
              </div>
              <span className="text-gray-700">{product.rating} stars</span>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-4xl font-bold text-emerald-600 mr-3">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-lg text-red-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                      {product.discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-emerald-600 text-sm mt-1">
                In Stock: {product.stock} units
              </p>
            </div>

            {/* Quantity Control */}
            <div className="flex items-center mb-7">
              <label
                htmlFor="quantity"
                className="mr-4 text-gray-700 font-medium"
              >
                Quantity:
              </label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => changeQuantity(-1)}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-200 text-gray-700"
                >
                  -
                </button>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={handleInputChange}
                  min="1"
                  className="w-20 py-2 text-center border-l border-r border-gray-300 focus:outline-none"
                />
                <button
                  onClick={() => changeQuantity(1)}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-200 text-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-emerald-600 text-white py-3 rounded-md font-semibold flex items-center justify-center transition-colors duration-300"
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
