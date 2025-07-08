// components/CartDropdown.js
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../store/cartSlice";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartDropdown = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4">
      {items.length === 0 ? (
        <p className="text-sm text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.productId} className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <img src={item.images[0]} alt={item.name} className="w-10 h-10 object-cover rounded" />
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-500">Tk {item.specialprice} x {item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.productId))}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <Link to="/cart" className="block text-center mt-3 bg-blue-600 text-white py-1 rounded hover:bg-blue-700">
            Go to Cart
          </Link>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
