'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TicketReminder() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    reminderTiming: '24h',
    notificationMethod: 'email'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // 模擬演出資料
  const eventData = {
    id: 1,
    artist: 'TWICE',
    tour: '5TH WORLD TOUR',
    date: '2025.06.15',
    time: '19:00',
    venue: '台北小巨蛋',
    saleDate: '2025.04.01',
    saleTime: '10:00',
    status: 'announced'
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
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
                className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto"
              >
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900">
                  提醒設定完成
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 font-light">
                  我們會在開賣前通知您
                </p>
              </div>

              {/* Reminder Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-left"
              >
                <h3 className="text-lg font-light text-gray-900 mb-4">提醒詳情</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">演出</span>
                    <span className="text-gray-900">{eventData.artist}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">開賣時間</span>
                    <span className="text-gray-900">{eventData.saleDate} {eventData.saleTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">提醒時間</span>
                    <span className="text-gray-900">
                      {formData.reminderTiming === '24h' ? '開賣前24小時' :
                       formData.reminderTiming === '1h' ? '開賣前1小時' :
                       formData.reminderTiming === '30m' ? '開賣前30分鐘' : '開賣時'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">通知方式</span>
                    <span className="text-gray-900">
                      {formData.notificationMethod === 'email' ? '電子郵件' :
                       formData.notificationMethod === 'sms' ? '簡訊' : '電子郵件 + 簡訊'}
                    </span>
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
                  <p>• 我們會在指定時間發送提醒通知</p>
                  <p>• 您可以隨時在會員中心管理提醒設定</p>
                  <p>• 開賣時請準時上線，以免錯過購票機會</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/member?tab=reminders">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-3 bg-gray-900 text-white rounded-full font-light hover:bg-gray-800 transition-colors"
                    >
                      管理我的提醒
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

  return (
    <div className="min-h-screen bg-white -mt-20">
      {/* Header */}
      <section className="pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8 text-center"
          >
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                即將開賣
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900">
                設定購票提醒
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 font-light">
                不錯過任何精彩演出
              </p>
            </div>

            {/* Event Info */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-left">
              <h3 className="text-lg font-light text-gray-900 mb-4">演出資訊</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">藝人</span>
                  <span className="text-gray-900">{eventData.artist}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">巡演</span>
                  <span className="text-gray-900">{eventData.tour}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">演出日期</span>
                  <span className="text-gray-900">{eventData.date} {eventData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">場地</span>
                  <span className="text-gray-900">{eventData.venue}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <span className="text-gray-600 font-medium">開賣時間</span>
                  <span className="text-gray-900 font-medium">{eventData.saleDate} {eventData.saleTime}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reminder Form */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
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
                    placeholder="your@email.com"
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
                          <span className="ml-auto text-sm px-2 py-1 bg-gray-900 text-white rounded">選中</span>
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
                        {/* <span className="text-sm mr-4 px-2 py-1 bg-gray-100 rounded">{method.icon.replace(/[^\w\s]/gi, method.label.charAt(0))}</span> */}
                        <span className="font-light">{method.label}</span>
                        {method.disabled && (
                          <span className="ml-auto text-xs text-gray-400">需要手機號碼</span>
                        )}
                        {!method.disabled && formData.notificationMethod === method.value && (
                          <span className="ml-auto text-sm px-2 py-1 bg-gray-900 text-white rounded">選中</span>
                        )}
                      </motion.label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-gray-900 text-white rounded-full font-light text-lg hover:bg-gray-800 transition-colors"
              >
                設定提醒
              </motion.button>
              
              <Link href="/tickets">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="w-full py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
                >
                  返回票券列表
                </motion.button>
              </Link>
            </div>

            {/* Privacy Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
              <p className="font-medium mb-2">隱私保護</p>
              <p className="text-xs leading-relaxed">
                您的聯絡資訊僅用於發送購票提醒，我們不會將其用於其他用途或與第三方分享。
                您可以隨時取消提醒設定。
              </p>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
