import React, { useState, useRef, useEffect } from "react";
import { FaShoppingCart, FaUserCircle, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartDropdown from "../product/CartDropDown";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef(null);

  const { items } = useSelector((state) => state.cart);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const categories = ["Laptop", "Monitor", "Accessories", "Dress", "Men", "Women", "Kids"];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setShowCart(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">E-Shop</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
          {categories.map((cat, i) => (
            <Link
              key={i}
              to={`/category/${cat.toLowerCase()}`}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              {cat}
            </Link>
          ))}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-full px-4 py-1 text-sm focus:outline-none focus:border-blue-500"
            />
            <FaSearch className="absolute top-2 right-3 text-gray-400" />
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4 relative">
          <FaUserCircle className="text-2xl text-gray-600 hover:text-blue-600 cursor-pointer" />

          {/* Cart Icon & Dropdown */}
          <div ref={cartRef} className="relative">
            <FaShoppingCart
              className="text-2xl text-gray-600 hover:text-blue-600 cursor-pointer"
              onClick={() => setShowCart((prev) => !prev)}
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
                {cartCount}
              </span>
            )}
            {showCart && (
              <div className="animate-slide-down transition-all duration-300">
                <CartDropdown />
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            {mobileMenuOpen ? (
              <FaTimes
                className="text-2xl text-gray-600 cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              />
            ) : (
              <FaBars
                className="text-2xl text-gray-600 cursor-pointer"
                onClick={() => setMobileMenuOpen(true)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2">
          <Link to="/" className="block text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/cart" className="block text-gray-700 hover:text-blue-600">Cart</Link>
          {categories.map((cat, i) => (
            <Link
              key={i}
              to={`/category/${cat.toLowerCase()}`}
              className="block text-gray-700 hover:text-blue-600"
            >
              {cat}
            </Link>
          ))}
          <div className="relative mt-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-full px-4 py-1 text-sm focus:outline-none focus:border-blue-500"
            />
            <FaSearch className="absolute top-2 right-4 text-gray-400" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
