'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // 模擬發送重設密碼郵件
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Password reset failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white -mt-20">
        <section className="pt-32 pb-20 px-8">
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.div>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl font-light text-gray-900">
                  重設連結已發送
                </h1>
                <p className="text-lg text-gray-600 font-light">
                  請檢查您的電子郵件
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-left">
                <h3 className="text-lg font-light text-blue-900 mb-4">接下來的步驟</h3>
                <div className="text-sm text-blue-800 space-y-2">
                  <p>1. 檢查您的電子郵件信箱</p>
                  <p>2. 點擊重設密碼連結</p>
                  <p>3. 設定新密碼</p>
                  <p>4. 使用新密碼登入</p>
                </div>
                
                <div className="mt-4 text-xs text-blue-700">
                  <p>沒有收到郵件？請檢查垃圾郵件資料夾，或重新發送。</p>
                </div>
              </div>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsSubmitted(false)}
                  className="w-full py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
                >
                  重新發送
                </motion.button>

                <Link href="/auth/login">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gray-900 text-white rounded-full font-light hover:bg-gray-800 transition-colors"
                  >
                    返回登入
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white -mt-20">
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                重設密碼
              </h1>
              <p className="text-gray-600 font-light">
                輸入您的電子郵件，我們將發送重設連結
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-600 mb-2">電子郵件</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <motion.button
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-full font-light transition-colors ${
                  isLoading 
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    發送中...
                  </div>
                ) : (
                  '發送重設連結'
                )}
              </motion.button>
            </form>

            <div className="text-center text-sm text-gray-600">
              記起密碼了？{' '}
              <Link href="/auth/login" className="text-gray-900 hover:underline">
                返回登入
              </Link>
            </div>

            {/* Security Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
              <h4 className="text-sm font-medium text-yellow-900 mb-2">安全提醒</h4>
              <ul className="text-xs text-yellow-800 space-y-1">
                <li>• 重設連結將在 24 小時後失效</li>
                <li>• 請勿與他人分享重設連結</li>
                <li>• 如有疑問請聯繫客服</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
