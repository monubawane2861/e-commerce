import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); //Ye addToCart() function CartContext se aata hai. when user click add to cardsfunction will be work

  const handleAddToCart = (e) => {
    e.preventDefault(); //dont want to navigate default link
    e.stopPropagation(); //karta hai ki click event parent components tak na jaye.
    addToCart(product); //product ko cart me add karta hai
  };

  const discountedPrice =
    // 100 * (1 - 20 / 100) = ₹80
    //100rs product aand 20 % discount
    product.price * (1 - product.discountPercentage / 100);

  return (
    // this complete code have add link this provide for complete card when we are cliking on cards they will show details
    <Link to={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-xl border border-gray-200  shadow-md transition-transform duration-300 hover:shadow-xl group-hover:scale-105">
        <div className="h-48 overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.title}
          </h3>

          <div className="flex items-center mt-1">
            <span className="text-lg font-bold text-emerald-600 ">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm line-through text-red-500 ml-2">
                ${product.price.toFixed(2)}
                {/* it is use for show 2 digit value */}
              </span>
            )}
          </div>

          <div className="mt-3 flex justify-between items-center">
            <span className="text-sm text-gray-500">{product.brand}</span>
            <button
              onClick={handleAddToCart}
              className="bg-emerald-600  text-white px-3 py-1 rounded-md text-sm hover:bg-emerald-600  transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
