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
    <div className="absolute -right-10 md:right-2 top-12 w-[90vw] md:w-80 bg-white border border-gray-300 rounded-lg shadow-xl z-50 p-4 max-h-[80vh] overflow-y-auto">
      {items.length === 0 ? (
        <p className="text-sm text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex flex-wrap md:flex-nowrap items-start justify-between gap-2"
              >
                <div className="flex gap-3 w-full">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Tk {item.specialprice} × {item.quantity}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
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
          <div className="mt-4 border-t pt-2 flex justify-between text-sm font-semibold">
            <span>Total:</span>
            <span>Tk {total}</span>
          </div>

          {/* Go to Cart */}
          <Link
            to="/cart"
            className="block text-center mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Go to Cart
          </Link>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
