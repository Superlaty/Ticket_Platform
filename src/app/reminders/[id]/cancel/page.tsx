'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CancelReminder() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [reason, setReason] = useState('');

  // 模擬提醒資料
  const reminderData = {
    id: 1,
    artist: 'TWICE',
    tour: '5TH WORLD TOUR',
    date: '2025.06.15',
    time: '19:00',
    venue: '台北小巨蛋',
    saleDate: '2025.04.01',
    saleTime: '10:00',
    reminderTime: '開賣前24小時',
    method: '電子郵件',
    createdAt: '2025.02.15'
  };

  const handleConfirmCancel = () => {
    setIsConfirmed(true);
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-white -mt-20">
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
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
                className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto"
              >
                <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.div>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900">
                  提醒已取消
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 font-light">
                  您將不會收到 {reminderData.artist} 的開賣提醒
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-left">
                <h3 className="text-lg font-light text-gray-900 mb-4">已取消的提醒</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">演出</span>
                    <span className="text-gray-900">{reminderData.artist} - {reminderData.tour}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">開賣時間</span>
                    <span className="text-gray-900">{reminderData.saleDate} {reminderData.saleTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">原提醒時間</span>
                    <span className="text-gray-900">{reminderData.reminderTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/member?tab=reminders">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-gray-900 text-white rounded-full font-light hover:bg-gray-800 transition-colors"
                  >
                    返回提醒管理
                  </motion.button>
                </Link>
                <Link href="/tickets">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
                  >
                    瀏覽其他演出
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
      {/* Header */}
      <section className="pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="flex items-center space-x-4">
              <Link href="/member?tab=reminders">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
              </Link>
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900">
                  取消提醒
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 font-light">
                  確認要取消這個提醒嗎？
                </p>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div className="text-red-800">
                  <p className="font-medium mb-2">注意事項</p>
                  <div className="text-sm leading-relaxed space-y-1">
                    <p>• 取消後您將不會收到開賣提醒</p>
                    <p>• 如果之後想重新設定，需要再次手動設定</p>
                    <p>• 建議您自行記錄開賣時間，避免錯過購票機會</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reminder Details */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-light text-gray-900 mb-6">即將取消的提醒</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">演出</span>
                    <p className="text-gray-900 mt-1 font-medium">{reminderData.artist}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">巡演</span>
                    <p className="text-gray-900 mt-1">{reminderData.tour}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">演出日期</span>
                    <p className="text-gray-900 mt-1">{reminderData.date} {reminderData.time}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">場地</span>
                    <p className="text-gray-900 mt-1">{reminderData.venue}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">開賣時間</span>
                    <p className="text-gray-900 mt-1 font-medium">{reminderData.saleDate} {reminderData.saleTime}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">提醒時間</span>
                    <p className="text-gray-900 mt-1">{reminderData.reminderTime}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">通知方式</span>
                    <p className="text-gray-900 mt-1">{reminderData.method}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">設定日期</span>
                    <p className="text-gray-900 mt-1">{reminderData.createdAt}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cancellation Reason (Optional) */}
            <div>
              <label className="block text-sm text-gray-600 mb-3">取消原因（選填）</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors resize-none"
                placeholder="告訴我們您取消提醒的原因，幫助我們改善服務..."
              />
              <p className="text-xs text-gray-500 mt-2">您的意見對我們很重要</p>
            </div>

            {/* Confirmation Buttons */}
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirmCancel}
                className="w-full py-4 bg-red-600 text-white rounded-full font-light text-lg hover:bg-red-700 transition-colors"
              >
                確認取消提醒
              </motion.button>
              
              <div className="grid grid-cols-2 gap-4">
                <Link href="/member?tab=reminders">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
                  >
                    返回
                  </motion.button>
                </Link>
                
                <Link href={`/reminders/${reminderData.id}/edit`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gray-900 text-white rounded-full font-light hover:bg-gray-800 transition-colors"
                  >
                    編輯提醒
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
