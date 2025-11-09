'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface SavedItem {
  id: number;
  name: string;
  artist: string;
  price: number;
  originalPrice?: number;
  size?: string;
  color?: string;
  image: string;
  savedDate: string;
  inStock: boolean;
  priceChanged: boolean;
  newPrice?: number;
}

export default function SavedItems() {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模擬載入已儲存的商品
    const loadSavedItems = () => {
      const mockSavedItems: SavedItem[] = [
        {
          id: 1,
          name: 'NewJeans 演唱會 T-Shirt',
          artist: 'NewJeans',
          price: 1280,
          originalPrice: 1680,
          size: 'L',
          color: 'White',
          image: 'bg-gradient-to-br from-pink-400 to-purple-500',
          savedDate: '2025.02.20',
          inStock: true,
          priceChanged: false
        },
        {
          id: 2,
          name: 'TWICE 限定手環',
          artist: 'TWICE',
          price: 680,
          originalPrice: 890,
          image: 'bg-gradient-to-br from-orange-400 to-pink-500',
          savedDate: '2025.02.15',
          inStock: false,
          priceChanged: true,
          newPrice: 580
        },
        {
          id: 3,
          name: 'BTS 官方燈棒',
          artist: 'BTS',
          price: 1890,
          image: 'bg-gradient-to-br from-purple-500 to-blue-500',
          savedDate: '2025.02.10',
          inStock: true,
          priceChanged: true,
          newPrice: 1690
        }
      ];
      
      setSavedItems(mockSavedItems);
      setIsLoading(false);
    };

    loadSavedItems();
  }, []);

  const moveToCart = (item: SavedItem) => {
    // 實際應用中會將商品移動到購物車
    console.log('Moving to cart:', item);
  };

  const removeFromSaved = (id: number) => {
    setSavedItems(savedItems.filter(item => item.id !== id));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white -mt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">載入已儲存商品中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white -mt-20">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">
                  已儲存商品
                </h1>
                <p className="text-lg text-gray-600 font-light">
                  {savedItems.length} 個已儲存的商品
                </p>
              </div>
              
              <Link href="/cart">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gray-900 text-white rounded-full font-light hover:bg-gray-800 transition-colors"
                >
                  查看購物車
                </motion.button>
              </Link>
            </div>

            {/* Saved Items List */}
            {savedItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-4xl text-gray-300 mb-6">儲存</div>
                <h2 className="text-2xl font-light text-gray-900 mb-4">沒有已儲存的商品</h2>
                <p className="text-gray-600 font-light mb-8">瀏覽商品時點擊「儲存稍後購買」來保存商品</p>
                <Link href="/merchandise">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-gray-900 text-white rounded-full font-light text-lg hover:bg-gray-800 transition-colors"
                  >
                    探索商品
                  </motion.button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {savedItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="bg-gray-50 rounded-2xl p-6"
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Product Image */}
                      <div className={`${item.image} w-full sm:w-24 lg:w-32 aspect-square sm:aspect-auto sm:h-24 lg:h-32 rounded-xl flex items-center justify-center flex-shrink-0 relative`}>
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                            <span className="text-white text-xs font-medium">缺貨</span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 space-y-4">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-light text-gray-900">
                              {item.name}
                            </h3>
                            
                            {/* Price Change Alert */}
                            {item.priceChanged && (
                              <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded-full">
                                價格異動
                              </span>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-600">{item.artist}</p>
                          {item.size && (
                            <p className="text-xs text-gray-500 mt-1">尺寸：{item.size}</p>
                          )}
                          {item.color && (
                            <p className="text-xs text-gray-500">顏色：{item.color}</p>
                          )}
                          <p className="text-xs text-gray-500">儲存於：{item.savedDate}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          {/* Price Info */}
                          <div className="space-y-1">
                            {item.priceChanged && item.newPrice ? (
                              <div className="flex items-center space-x-3">
                                <span className="text-lg font-light text-gray-900">
                                  NT$ {item.newPrice.toLocaleString()}
                                </span>
                                <span className="text-sm text-gray-400 line-through">
                                  NT$ {item.price.toLocaleString()}
                                </span>
                                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                  降價 NT$ {(item.price - item.newPrice).toLocaleString()}
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-3">
                                <span className="text-lg font-light text-gray-900">
                                  NT$ {item.price.toLocaleString()}
                                </span>
                                {item.originalPrice && (
                                  <span className="text-sm text-gray-400 line-through">
                                    NT$ {item.originalPrice.toLocaleString()}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-3">
                            {item.inStock ? (
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => moveToCart(item)}
                                className="px-4 py-2 bg-gray-900 text-white rounded-full font-light hover:bg-gray-800 transition-colors text-sm"
                              >
                                加入購物車
                              </motion.button>
                            ) : (
                              <motion.button
                                disabled
                                className="px-4 py-2 bg-gray-200 text-gray-400 rounded-full font-light cursor-not-allowed text-sm"
                              >
                                暫時缺貨
                              </motion.button>
                            )}
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeFromSaved(item.id)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-lg font-light text-gray-900 mb-4">快速操作</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    savedItems.filter(item => item.inStock).forEach(item => moveToCart(item));
                  }}
                  disabled={!savedItems.some(item => item.inStock)}
                  className={`py-3 rounded-full font-light transition-colors ${
                    savedItems.some(item => item.inStock)
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  全部加入購物車
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSavedItems(savedItems.filter(item => item.inStock))}
                  className="py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
                >
                  移除缺貨商品
                </motion.button>
                
                <Link href="/merchandise">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
                  >
                    繼續購物
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
