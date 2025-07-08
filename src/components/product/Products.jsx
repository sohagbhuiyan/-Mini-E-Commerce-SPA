import { camera, gaming, laptop, monitor } from "../../Utils/images";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    image: monitor,
    category: "Monitor",
    name: "HP M22F 21.5 Inch FHD IPS Monitor",
    description: "HP M22F 21.5 Inch FHD IPS Monitor #2E2Y3AA/2D ...",
    price: 12300,
    discount: 600
  },
  {
    id: 2,
    image: laptop,
    category: "Laptop",
    name: "Dell Inspiron 15 3511",
    description: "Intel Core i5 11th Gen, 8GB RAM, 512GB SSD...",
    price: 75000,
    discount: 1500
  },
  {
    id: 4,
    image: camera,
    category: "Camera",
    name: "Canon EOS 200D DSLR",
    description: "24.1MP, Dual Pixel CMOS AF, 4K video...",
    price: 55000,
    discount: 2000
  },
  {
    id: 5,
    image: gaming,
    category: "Gaming",
    name: "Gaming POE 4s 200D",
    description: "4K video, 24.1MP, Dual Pixel CMOS AF...",
    price: 55200,
    discount: 1200
  },
  {
    id: 6,
    image: monitor,
    category: "Monitor",
    name: "HP M22F 21.5 Inch FHD IPS Monitor",
    description: "HP M22F 21.5 Inch FHD IPS Monitor #2E2Y3AA/2D ...",
    price: 12300,
    discount: 600
  },
  {
    id: 7,
    image: laptop,
    category: "Laptop",
    name: "Dell Inspiron 15 3511",
    description: "Intel Core i5 11th Gen, 8GB RAM, 512GB SSD...",
    price: 75000,
    discount: 1500
  },
];

const Products = () => {
  return (
    <div className="py-1">
      <div className="bg-gray-300 p-2 mb-3">
        <p className="px-4">Collections</p>
      </div>
      <div className="grid grid-cols-2 px-4 mt-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 md:gap-6 lg:gap-8 mb-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
