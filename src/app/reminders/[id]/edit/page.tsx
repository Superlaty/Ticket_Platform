'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EditReminder() {
  const [formData, setFormData] = useState({
    email: 'xiaomei@example.com',
    phone: '0912-345-678',
    reminderTiming: '24h',
    notificationMethod: 'email'
  });

  const [isUpdated, setIsUpdated] = useState(false);

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
    status: 'active',
    createdAt: '2025.02.15'
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdated(true);
    setTimeout(() => setIsUpdated(false), 3000);
  };

  const handleDelete = () => {
    if (confirm('確定要取消這個提醒嗎？')) {
      // 處理刪除邏輯
      window.location.href = '/member?tab=reminders';
    }
  };

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
                  編輯提醒
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 font-light">
                  修改您的購票提醒設定
                </p>
              </div>
            </div>

            {/* Event Info */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-light text-gray-900 mb-4">演出資訊</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">藝人</span>
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
                <div className="sm:col-span-2 border-t border-gray-200 pt-3">
                  <span className="text-gray-500">開賣時間</span>
                  <p className="text-gray-900 mt-1 font-medium">{reminderData.saleDate} {reminderData.saleTime}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Edit Form */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Success Message */}
            {isUpdated && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center"
              >
                <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-800 font-medium">提醒設定已更新</span>
              </motion.div>
            )}

            <div>
              <h3 className="text-xl font-light text-gray-900 mb-6">聯絡資訊</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">電子郵件 *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">手機號碼（選填）</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                    placeholder="09XX-XXX-XXX"
                  />
                  <p className="text-xs text-gray-500 mt-2">提供手機號碼可接收簡訊提醒</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-light text-gray-900 mb-6">提醒設定</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-3">提醒時間</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: '24h', label: '開賣前24小時' },
                      { value: '1h', label: '開賣前1小時' },
                      { value: '30m', label: '開賣前30分鐘' },
                      { value: '0m', label: '開賣時' }
                    ].map((option) => (
                      <motion.label
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center justify-center p-4 border rounded-xl cursor-pointer transition-all ${
                          formData.reminderTiming === option.value
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="reminderTiming"
                          value={option.value}
                          checked={formData.reminderTiming === option.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <span className="text-sm font-light text-center">{option.label}</span>
                        {formData.reminderTiming === option.value && (
                          <span className="ml-auto text-gray-900">✓</span>
                        )}
                      </motion.label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-3">通知方式</label>
                  <div className="space-y-3">
                    {[
                      { value: 'email', label: '電子郵件', icon: '📧' },
                      { value: 'sms', label: '簡訊', icon: '📱', disabled: !formData.phone },
                      { value: 'both', label: '電子郵件 + 簡訊', icon: '📬', disabled: !formData.phone }
                    ].map((method) => (
                      <motion.label
                        key={method.value}
                        whileHover={{ scale: method.disabled ? 1 : 1.01 }}
                        className={`flex items-center p-4 border rounded-xl transition-all ${
                          method.disabled 
                            ? 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
                            : formData.notificationMethod === method.value
                              ? 'border-gray-900 bg-gray-50 cursor-pointer'
                              : 'border-gray-200 hover:border-gray-300 cursor-pointer'
                        }`}
                      >
                        <input
                          type="radio"
                          name="notificationMethod"
                          value={method.value}
                          checked={formData.notificationMethod === method.value}
                          onChange={handleInputChange}
                          disabled={method.disabled}
                          className="sr-only"
                        />
                        {/* <span className="text-2xl mr-4">{method.icon}</span> */}
                        <span className="font-light">{method.label}</span>
                        {method.disabled && (
                          <span className="ml-auto text-xs text-gray-400">需要手機號碼</span>
                        )}
                        {!method.disabled && formData.notificationMethod === method.value && (
                          <span className="ml-auto text-gray-900">✓</span>
                        )}
                      </motion.label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-gray-900 text-white rounded-full font-light text-lg hover:bg-gray-800 transition-colors"
              >
                更新提醒
              </motion.button>
              
              <div className="grid grid-cols-2 gap-4">
                <Link href="/member?tab=reminders">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="w-full py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
                  >
                    取消
                  </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleDelete}
                  className="w-full py-3 bg-red-50 text-red-600 border border-red-200 rounded-full font-light hover:bg-red-100 transition-colors"
                >
                  刪除提醒
                </motion.button>
              </div>
            </div>

            {/* Reminder Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-blue-800">
                  <p className="font-medium mb-2">提醒說明</p>
                  <div className="text-xs leading-relaxed space-y-1">
                    <p>• 提醒將在您設定的時間自動發送</p>
                    <p>• 您可以隨時修改或取消提醒設定</p>
                    <p>• 建議在開賣前準備好付款方式，以提高購票成功率</p>
                    <p>• 如果演出取消或延期，我們會另行通知</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
