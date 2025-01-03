import { useWishlist } from "@/context/WishlistProvider";
import { useState } from "react";
import { BsHandbag } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";

const NoProducts = () => (
  <div className="flex flex-col items-center justify-center p-12 text-center">
    <img src="jewellery_dog.png" width={200} height={200} alt="No products" className="mb-4 rounded-lg" />
    <h3 className="text-xl font-semibold text-gray-900">No Products Found</h3>
    <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
  </div>
);

export default function ProductList({ activeFilters = [], sortBy = 'popular', gridView = 'three' }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [hoveredId, setHoveredId] = useState(null);

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Extended product data with more properties to match filters
  const products = [
    {
      id: 1,
      name: "Modern Leather Backpack",
      price: 29.99,
      originalPrice: 39.99,
      image: "/jewellery_dog.png",
      category: "new-arrivals",
      discount: "25",
      isNew: true,
      inStock: true,
    },
    {
      id: 2,
      name: "Classic Travel Bag",
      price: 39.99,
      originalPrice: 79.98,
      image: "/jewellery_dog.png",
      category: "travel",
      discount: "50",
      isNew: false,
      inStock: true,
    },
    {
      id: 3,
      name: "Organizer Wallet",
      price: 49.99,
      originalPrice: 83.32,
      image: "/jewellery_dog.png",
      category: "organization",
      discount: "40",
      isNew: false,
      inStock: true,
    },
    {
      id: 4,
      name: "Premium Watch",
      price: 159.99,
      originalPrice: 199.99,
      image: "/jewellery_dog.png",
      category: "accessories",
      discount: "20",
      isNew: true,
      inStock: true,
    },
    {
      id: 5,
      name: "Sale Backpack",
      price: 69.99,
      originalPrice: 139.98,
      image: "/jewellery_dog.png",
      category: "sale",
      discount: "50",
      isNew: false,
      inStock: true,
    },
    {
      id: 6,
      name: "Travel Kit",
      price: 79.99,
      originalPrice: 159.98,
      image: "/jewellery_dog.png",
      category: "travel",
      discount: "50",
      isNew: false,
      inStock: true,
    },
  ];

  const calculateDiscount = (price, originalPrice) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  // Sort products based on sortBy value
  const sortProducts = (products) => {
    const sorted = [...products];
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.sort((a, b) => b.isNew - a.isNew);
      case 'rating':
        // Assuming you have a rating property, add if needed
        return sorted;
      case 'popular':
      default:
        // Keep original order for popular
        return sorted;
    }
  };

  // Group active filters by section
  const groupedFilters = activeFilters.reduce((acc, filter) => {
    if (!acc[filter.sectionId]) {
      acc[filter.sectionId] = [];
    }
    acc[filter.sectionId].push(filter);
    return acc;
  }, {});

  // Helper functions to check if a product matches filters in each category
  const matchesCategory = (product, categoryFilters) => {
    if (!categoryFilters || categoryFilters.length === 0) return true;
    return categoryFilters.some(filter => product.category === filter.value);
  };

  const matchesDiscount = (product, discountFilters) => {
    if (!discountFilters || discountFilters.length === 0) return true;
    return discountFilters.some(filter => product.discount === filter.value);
  };

  const matchesPrice = (product, priceFilters) => {
    if (!priceFilters || priceFilters.length === 0) return true;
    return priceFilters.some(filter => {
      if (filter.value === '200+') {
        return product.price >= 200;
      }
      const [min, max] = filter.value.split('-').map(Number);
      return product.price >= min && product.price <= max;
    });
  };

  // Filter products with OR condition within categories and AND between categories
  const filteredProducts = products.filter(product => {
    return matchesCategory(product, groupedFilters.category) &&
           matchesDiscount(product, groupedFilters.discounts) &&
           matchesPrice(product, groupedFilters.price);
  });

  // Sort the filtered products
  const sortedProducts = sortProducts(filteredProducts);

  if (sortedProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <NoProducts />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 sm:px-4 max-w-6xl">
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${
        gridView === 'three' ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
      } border-l border-gray-200`}>
        {sortedProducts.map((product, index) => (
          <div
            key={product.id}
            className={`border-r border-b ${
              index < (gridView === 'three' ? 3 : 2) ? 'border-t' : ''
            } border-gray-200`}
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="group relative bg-white">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                />
                {product.isNew && (
                  <span className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs rounded">
                    New!
                  </span>
                )}
                <button
                onClick={() => handleWishlistToggle(product)}
                  className={`absolute top-2 right-2 p-2 rounded-full ${
                    hoveredId === product.id ? "bg-white" : "bg-gray-50/80"
                  } transition-colors duration-200`}
                >
                  {isInWishlist(product.id) ? (
                <FiHeart className="w-5 h-5 text-rose-500 fill-current" />
              ) : (
                <FiHeart className="w-5 h-5 text-gray-600 hover:text-rose-500 transition-colors" />
              )}
                </button>
              </div>

              <div className="p-4">
                <div className="mb-2">
                  <span className="text-sm text-gray-500 capitalize">
                    {product.category.replace('-', ' ')}
                  </span>
                  <h3 className="font-medium text-gray-900 mt-1 truncate">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                      <span className="text-xs text-rose-500 bg-rose-50 rounded p-1 ml-2">
                        {calculateDiscount(product.price, product.originalPrice)}% OFF
                      </span>
                    </>
                  )}
                </div>

                <button className="mt-4 w-full bg-black text-white py-2 px-4 rounded flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors">
                  <BsHandbag className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}