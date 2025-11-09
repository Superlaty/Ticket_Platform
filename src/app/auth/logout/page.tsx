'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Logout() {
  useEffect(() => {
    // 執行登出操作
    const performLogout = () => {
      try {
        // 清除所有登入相關資料
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userId');
        localStorage.removeItem('userData');
        localStorage.removeItem('hasInfo');
        localStorage.removeItem('lotteryRegistrations');
        
        // 觸發狀態變化事件
        window.dispatchEvent(new Event('authStateChanged'));
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    performLogout();
  }, []);

  return (
    <div className="min-h-screen bg-white -mt-20">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
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
              className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto"
            >
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-light text-gray-900">
                登出成功
              </h1>
              <p className="text-lg text-gray-600 font-light">
                感謝您的使用，期待下次見面
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-left"
            >
              <h3 className="text-lg font-light text-blue-900 mb-4">已為您保留</h3>
              <div className="text-sm text-blue-800 space-y-2">
                <p>• 購物車中的商品</p>
                <p>• 已儲存的商品</p>
                <p>• 抽選登記記錄</p>
                <p>• 瀏覽偏好設定</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-6"
            >
              <div className="text-sm text-gray-600 space-y-2">
                <p>您可以繼續瀏覽我們的演出和商品</p>
                <p>需要購票或結帳時，請重新登入</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-gray-900 text-white rounded-full font-light hover:bg-gray-800 transition-colors"
                  >
                    返回首頁
                  </motion.button>
                </Link>
                
                <Link href="/auth/login">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
                  >
                    重新登入
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-gray-50 rounded-2xl p-6"
            >
              <h4 className="font-medium text-gray-900 mb-4">繼續探索</h4>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/tickets">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 bg-orange-500 text-white rounded-full text-sm font-light hover:bg-orange-600 transition-colors"
                  >
                    瀏覽演出
                  </motion.button>
                </Link>
                
                <Link href="/merchandise">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 bg-purple-500 text-white rounded-full text-sm font-light hover:bg-purple-600 transition-colors"
                  >
                    逛逛商城
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
