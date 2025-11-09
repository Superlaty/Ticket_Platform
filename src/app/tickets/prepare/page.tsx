'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TicketPrepare() {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const preparationItems = [
    {
      id: 1,
      title: '註冊或登入會員帳號',
      description: '會員享有更快的購票流程',
      action: '前往登入',
      actionLink: '/auth/login',
      priority: 'high'
    },
    {
      id: 2,
      title: '準備付款方式',
      description: '確保信用卡或電子支付可正常使用',
      action: '檢查付款',
      actionLink: '/member?tab=settings',
      priority: 'high'
    },
    {
      id: 3,
      title: '確認網路連線',
      description: '使用穩定的網路環境，避免使用VPN',
      action: '測試連線',
      actionLink: '#',
      priority: 'medium'
    },
    {
      id: 4,
      title: '準備個人資料',
      description: '姓名、電話、電子郵件等購票必填資訊',
      action: '更新資料',
      actionLink: '/member?tab=settings',
      priority: 'medium'
    },
    {
      id: 5,
      title: '選擇購票設備',
      description: '建議使用電腦或平板，避免手機購票',
      action: '設備檢查',
      actionLink: '#',
      priority: 'low'
    },
    {
      id: 6,
      title: '關閉不必要的程式',
      description: '關閉其他瀏覽器分頁和應用程式',
      action: '優化環境',
      actionLink: '#',
      priority: 'low'
    }
  ];

  const toggleCheck = (id: number) => {
    setCheckedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return '重要';
      case 'medium': return '建議';
      case 'low': return '選填';
      default: return '';
    }
  };

  const completionRate = Math.round((checkedItems.length / preparationItems.length) * 100);

  return (
    <div className="min-h-screen bg-white -mt-20">
      {/* Header */}
      <section className="pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-4">
                購票準備清單
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 font-light">
                做好準備，提高購票成功率
              </p>
            </div>

            {/* Progress */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-light text-gray-900">完成進度</h3>
                <span className="text-2xl font-light text-gray-900">{completionRate}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${completionRate}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-3 rounded-full bg-gradient-to-r from-gray-900 to-gray-700"
                />
              </div>
              
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>{checkedItems.length} / {preparationItems.length} 項目完成</span>
                <span>{completionRate === 100 ? '準備就緒！' : '繼續準備'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Preparation List */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {preparationItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`bg-gray-50 rounded-2xl p-6 sm:p-8 transition-all ${
                  checkedItems.includes(item.id) ? 'bg-green-50 border border-green-200' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* Checkbox */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleCheck(item.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      checkedItems.includes(item.id)
                        ? 'bg-green-600 border-green-600 text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {checkedItems.includes(item.id) && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </motion.button>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className={`text-lg font-light transition-colors ${
                        checkedItems.includes(item.id) ? 'text-green-900' : 'text-gray-900'
                      }`}>
                        {item.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                        {getPriorityText(item.priority)}
                      </span>
                    </div>
                    
                    <p className={`text-sm leading-relaxed mb-4 transition-colors ${
                      checkedItems.includes(item.id) ? 'text-green-700' : 'text-gray-600'
                    }`}>
                      {item.description}
                    </p>

                    {item.actionLink !== '#' && (
                      <Link href={item.actionLink}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-light hover:bg-gray-800 transition-colors"
                        >
                          {item.action}
                        </motion.button>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Final Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 text-center"
          >
            {completionRate === 100 ? (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 sm:p-8">
                  <div className="text-4xl text-green-600 mb-4">🎉</div>
                  <h3 className="text-2xl font-light text-green-900 mb-2">準備完成！</h3>
                  <p className="text-green-700 font-light">您已經做好購票準備，祝您購票順利！</p>
                </div>
                
                <Link href="/tickets">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-green-600 text-white rounded-full font-light text-lg hover:bg-green-700 transition-colors"
                  >
                    前往購票
                  </motion.button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-gray-600 font-light">
                  還有 {preparationItems.length - checkedItems.length} 個項目待完成
                </p>
                <Link href="/tickets">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-gray-900 text-white rounded-full font-light text-lg hover:bg-gray-800 transition-colors"
                  >
                    查看演出列表
                  </motion.button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
