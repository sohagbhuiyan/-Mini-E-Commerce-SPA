import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ id, image, category, name, price, discount, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevents navigating via Link
    dispatch(
      addToCart({
        productId: id,
        name,
        specialprice: price,
        images: [image],
        quantity: 1,
      })
    );
    toast.success("Added to cart!", { position: "top-right", autoClose: 2000 });
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`border border-gray-300 rounded-lg p-3 shadow-md hover:shadow-xl transition duration-500 bg-white cursor-pointer relative ${
        isHovered ? "scale-104" : "scale-100"
      }`}
    >
      <Link to={`/product/${name}`}>
        <div className="relative p-1 md:p-2 overflow-hidden rounded-md">
          <img 
            src={image} 
            alt={name} 
            className={`w-full h-40 object-cover rounded-md transition-transform duration-600 ${
              isHovered ? "scale-130" : "scale-100"
            }`}
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-2 text-center">
        <h2 className="text-sm md:text-md font-bold text-gray-700">{category}</h2>
        <p className="text-xs md:text-sm text-gray-600">{description}</p>
        <p className="text-sm md:text-lg font-bold text-gray-700 mt-1">Tk {price}</p>
        {discount && (
          <p className="text-purple-600 text-xs md:text-sm font-medium">
            Save Tk {discount} on online order
          </p>
        )}
      </div>

      {/* Add to Cart Button */}
      <div className="mt-3 text-center">
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center mx-auto text-sm md:text-md text-white bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-md cursor-pointer transition-colors"
        >
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
