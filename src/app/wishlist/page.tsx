'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'NewJeans 演唱會 T-Shirt',
      artist: 'NewJeans',
      price: 1280,
      originalPrice: 1680,
      inStock: true,
      image: 'bg-gradient-to-br from-pink-400 to-purple-500',
      addedDate: '2025.02.15'
    },
    {
      id: 2,
      name: 'BLACKPINK 官方周邊包',
      artist: 'BLACKPINK',
      price: 2490,
      inStock: true,
      image: 'bg-gradient-to-br from-black to-pink-500',
      addedDate: '2025.02.10'
    },
    {
      id: 3,
      name: 'BTS 官方燈棒',
      artist: 'BTS',
      price: 1890,
      inStock: false,
      image: 'bg-gradient-to-br from-purple-500 to-blue-500',
      addedDate: '2025.01.28'
    },
    {
      id: 4,
      name: 'TWICE 寫真集',
      artist: 'TWICE',
      price: 890,
      inStock: true,
      image: 'bg-gradient-to-br from-orange-400 to-pink-500',
      addedDate: '2025.01.20'
    }
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const addToCart = (id: number) => {
    // 這裡可以實作加入購物車的邏輯
  };

  return (
    <div className="min-h-screen bg-white -mt-20">
      {/* Header */}
      <section className="pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900">我的收藏</h1>
            <p className="text-lg sm:text-xl text-gray-600 font-light">
              {wishlistItems.length} 個收藏商品
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {wishlistItems.length === 0 ? (
            /* Empty Wishlist */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16 sm:py-20"
            >
              <div className="text-4xl sm:text-6xl text-gray-300 mb-6 sm:mb-8">收藏</div>
              <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">收藏清單是空的</h2>
              <p className="text-gray-600 font-light mb-8">發現喜歡的商品時，記得加入收藏！</p>
              <Link href="/merchandise">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gray-900 text-white rounded-full font-light text-lg hover:bg-gray-800 transition-colors"
                >
                  探索商品
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-gray-50 rounded-4xl overflow-hidden group"
                >
                  {/* Product Image */}
                  <div className={`${item.image} aspect-video relative flex items-center justify-center`}>
                    {/* <div className="text-6xl sm:text-8xl text-white/50">●</div> */}
                    
                    {/* Remove from Wishlist */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </motion.button>

                    {/* Stock Status */}
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="px-3 py-1 bg-white text-gray-900 rounded-full text-xs font-medium">
                          缺貨中
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-light text-gray-900 mb-1 text-sm sm:text-base">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">{item.artist}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-light text-gray-900">
                            NT$ {item.price.toLocaleString()}
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              NT$ {item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">加入於 {item.addedDate}</p>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Link href={`/merchandise/${item.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors text-sm"
                        >
                          查看詳情
                        </motion.button>
                      </Link>
                      
                      {item.inStock ? (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => addToCart(item.id)}
                          className="w-full py-3 bg-gray-900 text-white rounded-full font-light hover:bg-gray-800 transition-colors text-sm"
                        >
                          加入購物車
                        </motion.button>
                      ) : (
                        <motion.button
                          disabled
                          className="w-full py-3 bg-gray-200 text-gray-400 rounded-full font-light cursor-not-allowed text-sm"
                        >
                          暫時缺貨
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
