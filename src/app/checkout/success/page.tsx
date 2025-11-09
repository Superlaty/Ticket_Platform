'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CheckoutSuccess() {
  const orderData = {
    orderNumber: 'TK20250315001',
    artist: 'NewJeans',
    tour: 'Get Up World Tour',
    date: '2025.03.15',
    time: '19:30',
    venue: '台北小巨蛋',
    section: 'A區',
    quantity: 2,
    total: 6550
  };

  return (
    <div className="min-h-screen bg-white -mt-20">
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto"
            >
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-light text-gray-900">
                付費完成
              </h1>
              <p className="text-xl text-gray-600 font-light">
                您的票券已確認，感謝您的支持
              </p>
            </div>

            {/* Order Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-gray-50 rounded-2xl p-8 text-left"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-light text-gray-900 mb-4">訂單資訊</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">訂單編號</span>
                      <span className="text-gray-900 font-mono">{orderData.orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">演出</span>
                      <span className="text-gray-900">{orderData.artist}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">日期</span>
                      <span className="text-gray-900">{orderData.date} {orderData.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">場地</span>
                      <span className="text-gray-900">{orderData.venue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">座位</span>
                      <span className="text-gray-900">{orderData.section}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">數量</span>
                      <span className="text-gray-900">{orderData.quantity} 張</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-3">
                      <span className="text-gray-900 font-medium">總金額</span>
                      <span className="text-gray-900 font-medium">NT$ {orderData.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-6"
            >
              <div className="text-sm text-gray-600 space-y-2">
                <p>• 數位票券已可在「我的票券」中查看</p>
                <p>• 您也可以選擇列印實體票券</p>
                <p>• 演出當日請攜帶身分證件入場</p>
                <p>• 可隨時出示 QR Code 進行入場驗證</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/my-tickets">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-gray-900 text-white rounded-full font-light hover:bg-gray-800 transition-colors"
                  >
                    查看我的票券
                  </motion.button>
                </Link>
                <Link href="/tickets">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
                  >
                    繼續瀏覽演出
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
