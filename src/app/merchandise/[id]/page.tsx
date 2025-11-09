"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  // 根據 ID 獲取商品資訊
  const getProductData = (id: string) => {
    const products = {
      '1': {
        id: 1,
        name: "NewJeans 官方應援燈",
        artist: "NewJeans",
        price: 1200,
        originalPrice: 1500,
        description: "NewJeans 官方授權應援燈，LED 燈效，可連接演唱會同步燈光效果。",
        sizes: ["One Size"],
        colors: ["White", "Pink"],
        inStock: true,
        stock: 45,
        tag: "限量",
        images: [
          "bg-gradient-to-br from-white to-gray-200",
          "bg-gradient-to-br from-rose-400 to-rose-500",
        ],
      },
      '2': {
        id: 2,
        name: "BLACKPINK 演唱會T恤",
        artist: "BLACKPINK",
        price: 890,
        originalPrice: 1200,
        description: "BLACKPINK Born Pink 巡演限定款 T-Shirt，採用優質純棉材質，舒適透氣。",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "White", "Pink"],
        inStock: true,
        stock: 120,
        tag: "熱賣",
        images: [
          "bg-gradient-to-br from-gray-600 to-gray-500",
          "bg-gradient-to-br from-white to-gray-200",
          "bg-gradient-to-br from-rose-400 to-rose-500",
        ],
      },
      '3': {
        id: 3,
        name: "BTS 紀念徽章套組",
        artist: "BTS",
        price: 650,
        originalPrice: 800,
        description: "BTS Yet To Come 巡演紀念徽章套組，包含7個成員徽章及限定收藏盒。",
        sizes: ["One Size"],
        colors: ["Purple", "Gold"],
        inStock: true,
        stock: 8,
        tag: "即將售罄",
        images: [
          "bg-gradient-to-br from-purple-600 to-purple-500",
          "bg-gradient-to-br from-yellow-400 to-yellow-500",
        ],
      },
      '4': {
        id: 4,
        name: "IU 限定海報",
        artist: "IU",
        price: 450,
        originalPrice: 600,
        description: "IU The Golden Hour 演唱會限定海報，A2 尺寸，高品質印刷。",
        sizes: ["A2"],
        colors: ["Original"],
        inStock: true,
        stock: 200,
        tag: "新品",
        images: [
          "bg-gradient-to-br from-yellow-400 to-orange-500",
        ],
      }
    };
    return products[id as keyof typeof products] || products['1'];
  };

  const product = getProductData(resolvedParams.id);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "Black");
  const [quantity, setQuantity] = useState(1);
  // const [isInWishlist, setIsInWishlist] = useState(false);
  // const [addedToCart, setAddedToCart] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);

  // const handleAddToCart = () => {
  //   setAddedToCart(true);
  //   setTimeout(() => setAddedToCart(false), 2000);
  // };

  // const toggleWishlist = () => {
  //   setIsInWishlist(!isInWishlist);
  // };

  return (
    <div className="min-h-screen bg-white -mt-20">
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Product Images */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className={`${product.images[selectedImage]} aspect-square rounded-[3rem] flex items-center justify-center`}
              >
                {/* <div className="text-9xl text-white/50">●</div> */}
              </motion.div>

              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`${image} aspect-square rounded-4xl flex items-center justify-center `}
                  >
                    {/* <div className="text-4xl text-white/50">●</div> */}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-4xl font-light text-gray-900">
                    {product.name}
                  </h1>
                  <p className="text-lg text-gray-600">{product.artist}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-light text-gray-900">
                    NT$ {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      NT$ {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                      省 NT${" "}
                      {(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {/* Size Selection */}
                <div>
                  <h3 className="text-lg font-light text-gray-900 mb-4">
                    尺寸
                  </h3>
                  <div className="flex space-x-3">
                    {product.sizes.map((size) => (
                      <motion.button
                        key={size}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 border rounded-xl transition-colors ${
                          selectedSize === size
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <h3 className="text-lg font-light text-gray-900 mb-4">
                    顏色
                  </h3>
                  <div className="flex space-x-3">
                    {product.colors.map((color) => (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedColor(color)}
                        className={`px-6 py-3 border rounded-xl transition-colors ${
                          selectedColor === color
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {color}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <h3 className="text-lg font-light text-gray-900 mb-4">
                    數量
                  </h3>
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      −
                    </motion.button>
                    <span className="text-xl font-light min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex flex-col space-y-4">
                <Link href={`/cart?product=${product.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gray-900 text-white rounded-full font-light text-lg hover:bg-gray-800 transition-colors"
                  >
                    加入購物車
                  </motion.button>
                </Link>
                <Link href={`/wishlist?product=${product.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 border border-gray-300 text-gray-600 rounded-full font-light text-lg hover:border-gray-400 transition-colors"
                  >
                    加入收藏
                  </motion.button>
                </Link>
              </div>

              {/* Product Details */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-light text-gray-900 mb-4">
                  商品描述
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                <div className="mt-6 space-y-2 text-sm text-gray-600">
                  <p>• 材質：100% 純棉</p>
                  <p>• 產地：韓國</p>
                  <p>• 洗滌：機洗冷水，低溫烘乾</p>
                  <p>• 官方授權商品</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-2xl font-light text-gray-900 mb-12 text-center">
            相關商品
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { id: 1, name: "NewJeans 限定帽子", price: 1250, artist: "NewJeans" },
              { id: 2, name: "NewJeans 周邊包", price: 2490, artist: "NewJeans" },
              { id: 3, name: "NewJeans 貼紙組", price: 380, artist: "NewJeans" },
            ].map((item, index) => (
              <Link href={`/merchandise/${item.id}`} key={item.id}><motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-4xl overflow-hidden cursor-pointer group"
              >
                <div className="bg-gradient-to-br from-gray-600 to-gray-500 aspect-square flex items-center justify-center">
                  {/* <div className="text-6xl text-white/50">●</div> */}
                </div>
                <div className="p-6">
                  <h3 className="font-light text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{item.artist}</p>
                  <p className="text-lg font-light text-gray-900">
                    NT$ {item.price.toLocaleString()}
                  </p>
                </div>
              </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
