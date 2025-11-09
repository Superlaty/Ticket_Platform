'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface RegistrationData {
  artist: string;
  section: string;
  quantity: number;
  tour: string;
  date: string;
  lotteryDate: string;
  registrationNumber: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  
  useEffect(() => {
    // 從 URL 參數或 localStorage 獲取登記資料
    const artist = searchParams.get('artist') || 'NewJeans';
    const section = searchParams.get('section') || 'A區';
    const quantity = searchParams.get('quantity') || '2';
    
    setRegistrationData({
      artist,
      section,
      quantity: parseInt(quantity),
      tour: 'Get Up World Tour',
      date: '2025.03.15',
      lotteryDate: '2025.03.12',
      registrationNumber: `REG-${Date.now().toString().slice(-8).toUpperCase()}`
    });
  }, [searchParams]);

  const nextSteps = [
    {
      title: '等待開獎',
      description: '系統將於 2025.03.12 進行公正抽選',
      date: '2025.03.12',
      status: 'upcoming'
    },
    {
      title: '結果通知',
      description: '中選結果將透過電子郵件通知',
      date: '2025.03.12',
      status: 'upcoming'
    },
    {
      title: '完成付費',
      description: '若中選請於期限內完成付費',
      date: '2025.03.14',
      status: 'upcoming'
    },
    {
      title: '取得票券',
      description: '付費完成後即可下載數位票券',
      date: '2025.03.15',
      status: 'upcoming'
    }
  ];

  if (!registrationData) {
    return (
      <div className="min-h-screen bg-white -mt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white -mt-20">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Success Header */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              
              <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
                登記成功！
              </h1>
              <p className="text-lg text-gray-600 font-light">
                您已成功登記抽選，祝您好運
              </p>
            </div>

            {/* Registration Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-green-50 border border-green-200 rounded-2xl p-6 sm:p-8"
            >
              <h3 className="text-xl font-light text-green-900 mb-6">登記摘要</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-green-700">演出</span>
                    <p className="font-medium text-green-900">{registrationData.artist}</p>
                  </div>
                  <div>
                    <span className="text-green-700">巡演</span>
                    <p className="font-medium text-green-900">{registrationData.tour}</p>
                  </div>
                  <div>
                    <span className="text-green-700">演出日期</span>
                    <p className="font-medium text-green-900">{registrationData.date}</p>
                  </div>
                  <div>
                    <span className="text-green-700">登記區域</span>
                    <p className="font-medium text-green-900">{registrationData.section}</p>
                  </div>
                  <div>
                    <span className="text-green-700">登記數量</span>
                    <p className="font-medium text-green-900">{registrationData.quantity} 張</p>
                  </div>
                  <div>
                    <span className="text-green-700">登記編號</span>
                    <p className="font-mono text-sm text-green-900">{registrationData.registrationNumber}</p>
                  </div>
                </div>
                
                <div className="border-t border-green-300 pt-4">
                  <div className="text-sm text-green-800">
                    <p className="font-medium mb-1">重要提醒：</p>
                    <p>請記住您的登記編號，開獎結果將於 {registrationData.lotteryDate} 公布</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Next Steps Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8"
            >
              <h3 className="text-xl font-light text-gray-900 mb-6">接下來的步驟</h3>
              
              <div className="space-y-6">
                {nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900">{step.title}</h4>
                        <span className="text-sm text-gray-600">{step.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/my-tickets">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gray-900 text-white rounded-full font-light text-lg hover:bg-gray-800 transition-colors"
                  >
                    查看我的登記
                  </motion.button>
                </Link>
                
                <Link href="/tickets">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 border border-gray-300 text-gray-600 rounded-full font-light text-lg hover:border-gray-400 transition-colors"
                  >
                    繼續瀏覽演出
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Important Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <h4 className="font-medium text-yellow-900 mb-3">重要提醒</h4>
              <div className="text-sm text-yellow-800 space-y-2">
                <p>• 請確保您的電子郵件地址正確，以免錯過中選通知</p>
                <p>• 可隨時在會員中心查看登記狀態</p>
                <p>• 如需取消登記，請在開獎前完成</p>
                <p>• 中選後請務必在期限內完成付費</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default function RegistrationSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white -mt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">載入登記結果中...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
