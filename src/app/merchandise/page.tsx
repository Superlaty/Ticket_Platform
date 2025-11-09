'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Merchandise() {
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const categories = ['全部', '服飾', '配件', '收藏品'];

  const products = [
    {
      id: 1,
      name: 'NewJeans 演唱會 T-Shirt',
      price: 1280,
      category: '服飾',
      artist: 'NewJeans',
      inStock: true
    },
    {
      id: 2,
      name: 'BLACKPINK 官方周邊包',
      price: 2490,
      category: '配件',
      artist: 'BLACKPINK',
      inStock: true
    },
    {
      id: 3,
      name: 'BTS 官方燈棒',
      price: 1890,
      category: '配件',
      artist: 'BTS',
      inStock: false
    },
    {
      id: 4,
      name: 'TWICE 寫真集',
      price: 890,
      category: '收藏品',
      artist: 'TWICE',
      inStock: true
    },
    {
      id: 5,
      name: '(G)I-DLE 限定帽子',
      price: 1250,
      category: '服飾',
      artist: '(G)I-DLE',
      inStock: true
    },
    {
      id: 6,
      name: 'aespa 貼紙組',
      price: 380,
      category: '收藏品',
      artist: 'aespa',
      inStock: true
    }
  ];

  const filteredProducts = selectedCategory === '全部' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white -mt-20">
      {/* Hero Section - Max Braun minimalist style */}
      <section className="pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-6xl font-light text-gray-900">商城</h1>
            <p className="text-xl text-gray-600 font-light max-w-2xl">
              精選商品，簡單購買
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-8 border-b border-gray-200">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`pb-4 font-light transition-colors ${
                  selectedCategory === category
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProducts.map((product, index) => (
              <Link href={`/merchandise/${product.id}`} key={product.id}><motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group cursor-pointer"
              >
                {/* Product Image */}
                <div className="bg-gradient-to-br from-rose-500 to-rose-400 aspect-square rounded-4xl mb-6 flex items-center justify-center">
                  {/* <div className="text-8xl text-gray-300">●</div> */}
                </div>
               
                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-light text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">{product.artist}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-light text-gray-900">
                      NT$ {product.price.toLocaleString()}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.inStock 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {product.inStock ? '現貨' : '缺貨'}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!product.inStock}
                    className={`w-full py-3 rounded-full font-light transition-colors ${
                      product.inStock
                        ? 'bg-gray-900 text-white hover:bg-gray-800'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? '加入購物車' : '暫時缺貨'}
                  </motion.button>
                </div>
              </motion.div></Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
