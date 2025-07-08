import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../store/cartSlice";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartDropdown = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce(
    (sum, item) => sum + item.specialprice * item.quantity,
    0
  );

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4">
      {items.length === 0 ? (
        <p className="text-sm text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Tk {item.specialprice} x {item.quantity}
                    </p>
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1 mt-1">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.productId))}
                        className="text-xs p-1 bg-gray-200 hover:bg-gray-300 rounded"
                      >
                        <FaMinus />
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item.productId))}
                        className="text-xs p-1 bg-gray-200 hover:bg-gray-300 rounded"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.productId))}
                  className="text-red-500 hover:text-red-700"
                  title="Remove"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-2 border-t pt-2 text-sm font-semibold flex justify-between">
            <span>Total:</span>
            <span>Tk {total}</span>
          </div>

          {/* Go to Cart */}
          <Link
            to="/cart"
            className="block text-center mt-3 bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
          >
            Go to Cart
          </Link>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
