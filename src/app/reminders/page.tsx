'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Reminders() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: '全部' },
    { id: 'active', label: '進行中' },
    { id: 'completed', label: '已完成' }
  ];

  const reminders = [
    {
      id: 1,
      artist: 'TWICE',
      tour: '5TH WORLD TOUR',
      date: '2025.06.15',
      venue: '台北小巨蛋',
      saleDate: '2025.04.01',
      saleTime: '10:00',
      reminderTime: '開賣前24小時',
      method: '電子郵件',
      status: 'active',
      createdAt: '2025.02.15'
    },
    {
      id: 2,
      artist: '(G)I-DLE',
      tour: 'World Tour',
      date: '2025.07.20',
      venue: '台北流行音樂中心',
      saleDate: '2025.05.15',
      saleTime: '10:00',
      reminderTime: '開賣前1小時',
      method: '電子郵件 + 簡訊',
      status: 'active',
      createdAt: '2025.02.10'
    },
    {
      id: 3,
      artist: 'aespa',
      tour: 'MY WORLD',
      date: '2025.03.20',
      venue: '台北小巨蛋',
      saleDate: '2025.03.01',
      saleTime: '10:00',
      reminderTime: '開賣前24小時',
      method: '電子郵件',
      status: 'completed',
      createdAt: '2025.01.15'
    }
  ];

  const filteredReminders = reminders.filter(reminder => {
    if (activeFilter === 'all') return true;
    return reminder.status === activeFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-600';
      case 'sent': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '已設定';
      case 'completed': return '已完成';
      case 'sent': return '已發送';
      default: return status;
    }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900">購票提醒</h1>
            <p className="text-lg sm:text-xl text-gray-600 font-light">
              管理您的演出開賣提醒
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 sm:space-x-8 border-b border-gray-200">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`pb-4 font-light transition-colors whitespace-nowrap text-sm sm:text-base ${
                  activeFilter === filter.id
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Reminders List */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {filteredReminders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 sm:py-20"
            >
              <div className="text-6xl sm:text-8xl text-gray-300 mb-6 sm:mb-8">🔔</div>
              <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">沒有提醒設定</h2>
              <p className="text-gray-600 font-light mb-8">設定提醒，不錯過任何精彩演出！</p>
              <Link href="/tickets">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gray-900 text-white rounded-full font-light text-lg hover:bg-gray-800 transition-colors"
                >
                  瀏覽演出
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {filteredReminders.map((reminder, index) => (
                <motion.div
                  key={reminder.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-gray-50 rounded-2xl p-6 sm:p-8"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-light text-gray-900">{reminder.artist}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reminder.status)}`}>
                          {getStatusText(reminder.status)}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{reminder.tour}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">演出日期</span>
                          <p className="text-gray-900 mt-1">{reminder.date}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">場地</span>
                          <p className="text-gray-900 mt-1">{reminder.venue}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">開賣時間</span>
                          <p className="text-gray-900 mt-1">{reminder.saleDate} {reminder.saleTime}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">提醒設定</span>
                          <p className="text-gray-900 mt-1">{reminder.reminderTime}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-xs text-gray-500">
                        通知方式：{reminder.method} · 設定於 {reminder.createdAt}
                      </div>
                    </div>
                    
                    <div className="flex space-x-3 lg:ml-6">
                      {reminder.status === 'active' && (
                        <>
                          <Link href={`/reminders/${reminder.id}/edit`}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 border border-gray-300 text-gray-600 rounded-full text-sm font-light hover:border-gray-400 transition-colors"
                            >
                              編輯提醒
                            </motion.button>
                          </Link>
                          <Link href={`/reminders/${reminder.id}/cancel`}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 text-red-500 hover:text-red-600 transition-colors text-sm font-light"
                            >
                              取消提醒
                            </motion.button>
                          </Link>
                        </>
                      )}
                      {reminder.status === 'completed' && (
                        <Link href={`/tickets/${reminder.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-light hover:bg-gray-800 transition-colors"
                          >
                            查看演出
                          </motion.button>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900">設定提醒很簡單</h2>
            <p className="text-gray-600 font-light max-w-2xl mx-auto">
              在任何演出頁面點擊「提醒我」按鈕，我們會在開賣前通知您
            </p>
            <Link href="/tickets">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gray-900 text-white rounded-full font-light text-lg hover:bg-gray-800 transition-colors"
              >
                瀏覽演出
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
