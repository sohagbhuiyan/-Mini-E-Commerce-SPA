import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import {
  camera, camera1, camera2,
  gaming, gaming1, gaming2, laptop, monitor
} from "../../Utils/images";
import CheckoutModal from "./CheckoutModal";

const productData = {
  "HP M22F 21.5 Inch FHD IPS Monitor": {
    images: [monitor, laptop, monitor],
    category: "Monitor",
    name: "HP M22F 21.5 Inch FHD IPS Monitor",
    description: "HP M22F 21.5 Inch FHD IPS Monitor #2E2Y3AA/2D...",
    specialprice: 12300,
    regularprice: 12900,
    discount: 600,
    productId: "91.07.154.108",
    details: {
      displaySize: "21.5 Inch",
      resolution: "1920x1080",
      panelType: "IPS",
      refreshRate: "75Hz",
      rotatable: "No",
      hdmiPort: "1",
    },
  },
  "Dell Inspiron 15 3511": {
    images: [laptop, monitor, laptop],
    category: "Laptop",
    name: "Dell Inspiron 15 core i5 with Sata SSD",
    description: "Intel Core i5 11th Gen, 8GB RAM, 512GB SSD...",
    specialprice: 75000,
    regularprice: 76500,
    discount: 1500,
    productId: "92.04.120.207",
    details: {
      displaySize: "15.6 Inch",
      resolution: "1920x1080",
      panelType: "IPS",
      refreshRate: "60Hz",
      rotatable: "No",
      hdmiPort: "1",
    },
  },
  "Canon EOS 200D DSLR": {
    images: [camera, camera1, camera2],
    category: "Camera",
    name: "Canon EOS 200D DSLR",
    description: "24.1MP, Dual Pixel CMOS AF, 4K video...",
    specialprice: 55000,
    regularprice: 57000,
    discount: 2000,
    productId: "94.04.120.202",
    details: {
      displaySize: "3.0 Inch",
      resolution: "6000x4000",
      panelType: "CMOS",
      refreshRate: "60Hz",
      rotatable: "Yes",
      hdmiPort: "1",
    },
  },
  "Gaming POE 4s 200D": {
    images: [gaming, gaming1, gaming2],
    category: "Gaming",
    name: "Gaming POE 4s 200D",
    description: "4K video, 24.1MP, Dual Pixel CMOS AF...",
    specialprice: 55200,
    regularprice: 56400,
    discount: 1200,
    productId: "95.05.130.303",
    details: {
      displaySize: "N/A",
      resolution: "3840x2160",
      panelType: "LED",
      refreshRate: "144Hz",
      rotatable: "No",
      hdmiPort: "2",
    },
  },
  "GPU QSW Ew00D": {
    images: [camera, camera1, camera2],
    category: "GPU",
    name: "GPU QSW Ew00D",
    description: "Dual Pixel, 24.1MP, CMOS AF, 4K video...",
    specialprice: 55200,
    regularprice: 55900,
    discount: 700,
    productId: "93.07.154.101",
    details: {
      displaySize: "N/A",
      resolution: "7680x4320",
      panelType: "GDDR6X",
      refreshRate: "N/A",
      rotatable: "No",
      hdmiPort: "3",
    },
  },
};

const ProductView = () => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const product = productData[decodedName];
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.images[0] || "");
  const [zoomStyle, setZoomStyle] = useState({ display: "none" });
  const [openModal, setOpenModal] = useState(false);

  if (!product) {
    return <h2 className="text-center text-xl mt-6">Product Not Found</h2>;
  }

  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - rect.left) / rect.width) * 100;
    const y = ((e.pageY - rect.top) / rect.height) * 100;
    setZoomStyle({
      backgroundImage: `url(${mainImage})`,
      backgroundSize: "200%",
      backgroundPosition: `${x}% ${y}%`,
      display: "block",
    });
  };

  const handleMouseLeave = () => setZoomStyle({ display: "none" });

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="p-4 md:p-8 flex flex-col md:flex-row-reverse gap-6">
      {/* Right Section */}
      <div className="md:w-1/2">
        <h2 className="text-lg md:text-2xl font-bold text-gray-800">{product.name}</h2>
        <p className="text-sm text-gray-500 mt-1">Product ID: {product.productId}</p>

        <p className="text-red-600 font-bold md:text-lg mt-3">
          Special Price: Tk {product.specialprice}
        </p>
        <p className="text-gray-700">Regular Price: Tk {product.regularprice}</p>
        {product.discount > 0 && (
          <p className="text-sm text-purple-600">
            Save Tk {product.discount} on online order
          </p>
        )}

        <p className="mt-3 text-sm text-gray-800">{product.description}</p>

        <h3 className="mt-4 font-semibold text-gray-700">Specifications</h3>
        <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
          {Object.entries(product.details).map(([key, val]) => (
            <li key={key}>
              <strong className="capitalize">{key.replace(/([A-Z])/g, " $1")}:</strong> {val}
            </li>
          ))}
        </ul>

        {/* Quantity & Buttons */}
        <div className="mt-5 flex flex-wrap gap-2 sm:gap-3 items-center">
          <button className="bg-gray-300 px-3 py-1 rounded" onClick={decreaseQuantity}>-</button>
          <span>{quantity}</span>
          <button className="bg-gray-300 px-3 py-1 rounded" onClick={increaseQuantity}>+</button>
          <button
            className="ml-2 bg-blue-600 text-white text-xs sm:text-md px-2 md:px-5 py-2 rounded hover:bg-blue-700"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button
            className="bg-green-600 text-white text-xs sm:text-md px-2 md:px-5 py-2 rounded hover:bg-green-700"
            onClick={() => setOpenModal(true)}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col-reverse md:flex-row gap-4 items-center">
        <div className="flex md:flex-col gap-2">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`thumb-${i}`}
              className="w-14 h-14 object-cover border border-gray-400 cursor-pointer"
              onClick={() => setMainImage(img)}
              onMouseEnter={() => setMainImage(img)}
            />
          ))}
        </div>

        <div
          className="relative w-72 h-72 sm:w-96 sm:h-96 border border-gray-400 overflow-hidden cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img src={mainImage} alt={product.name} className="w-full h-full object-contain" />
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={zoomStyle}
          />
        </div>
      </div>

      <Toaster />
      <CheckoutModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default ProductView;
