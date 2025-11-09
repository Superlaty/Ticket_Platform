'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LotteryPayment() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);

  // 中選資訊
  const lotteryResult = {
    artist: 'NewJeans',
    tour: 'Get Up World Tour',
    date: '2025.03.15',
    time: '19:30',
    venue: '台北小巨蛋',
    section: 'A區',
    quantity: 2,
    price: 3200,
    fees: 150,
    total: 6550,
    paymentDeadline: '2025.03.14 23:59',
    lotteryNumber: 'NJ20250315-A-001234'
  };

  // 倒數計時
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // 模擬付款處理
    setTimeout(() => {
      window.location.href = '/checkout/success';
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white -mt-20">
      {/* Header */}
      <section className="pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
              恭喜中選！
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-4">
              完成付費
            </h1>
            <p className="text-lg text-gray-600 font-light">
              請於期限內完成付費以確保您的票券
            </p>
          </motion.div>
        </div>
      </section>

      {/* Payment Deadline Counter */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-red-50 border border-red-200 rounded-2xl p-6 sm:p-8"
          >
            <div className="text-center">
              <h3 className="text-lg font-light text-red-900 mb-4">付費倒數時間</h3>
              <div className="grid grid-cols-4 gap-4 mb-4">
                {[
                  { label: '天', value: timeLeft.days },
                  { label: '時', value: timeLeft.hours },
                  { label: '分', value: timeLeft.minutes },
                  { label: '秒', value: timeLeft.seconds }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm">
                      <div className="text-2xl sm:text-3xl font-light text-red-600">
                        {item.value.toString().padStart(2, '0')}
                      </div>
                    </div>
                    <div className="text-xs text-red-700 mt-2">{item.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-red-700">
                付費期限：{lotteryResult.paymentDeadline}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-8"
              >
                {/* Lottery Details */}
                <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-xl font-light text-gray-900 mb-6">中選詳情</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-500">中選號碼</span>
                        <p className="font-mono text-sm text-gray-900 mt-1">
                          {lotteryResult.lotteryNumber}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">演出</span>
                        <p className="text-gray-900 mt-1">
                          {lotteryResult.artist} - {lotteryResult.tour}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">演出時間</span>
                        <p className="text-gray-900 mt-1">
                          {lotteryResult.date} {lotteryResult.time}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">場地</span>
                        <p className="text-gray-900 mt-1">{lotteryResult.venue}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">座位區域</span>
                        <p className="text-gray-900 mt-1">{lotteryResult.section}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">票券數量</span>
                        <p className="text-gray-900 mt-1">{lotteryResult.quantity} 張</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-6">
                  <h3 className="text-xl font-light text-gray-900">付款方式</h3>
                  
                  <div className="space-y-3">
                    {[
                      { id: 'credit-card', name: '信用卡', icon: '卡片', desc: '支援 Visa、Mastercard、JCB' },
                      { id: 'line-pay', name: 'LINE Pay', icon: 'LINE', desc: '快速安全的行動支付' },
                      { id: 'apple-pay', name: 'Apple Pay', icon: 'Apple', desc: 'Touch ID 或 Face ID 快速付款' },
                      { id: 'bank-transfer', name: '銀行轉帳', icon: '銀行', desc: 'ATM 或網路銀行轉帳' }
                    ].map((method) => (
                      <motion.label
                        key={method.id}
                        whileHover={{ scale: 1.01 }}
                        className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                          paymentMethod === method.id
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="sr-only"
                        />
                        {/* <span className="text-sm mr-4 px-2 py-1 bg-gray-100 rounded">{method.icon}</span> */}
                        <div className="flex-1">
                          <div className="font-light text-gray-900">{method.name}</div>
                          <div className="text-xs text-gray-500">{method.desc}</div>
                        </div>
                        {paymentMethod === method.id && (
                          <span className="text-gray-900 text-sm px-2 py-1 bg-gray-900 text-white rounded">選中</span>
                        )}
                      </motion.label>
                    ))}
                  </div>
                </div>

                {/* Credit Card Form */}
                {paymentMethod === 'credit-card' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4"
                  >
                    <h4 className="font-light text-gray-900 mb-4">信用卡資訊</h4>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">卡號</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">有效期限</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">安全碼</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Payment Summary */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 h-fit">
              <h3 className="text-lg sm:text-xl font-light text-gray-900 mb-6">付款摘要</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">票價 ({lotteryResult.quantity} 張)</span>
                  <span>NT$ {(lotteryResult.price * lotteryResult.quantity).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">手續費</span>
                  <span>NT$ {lotteryResult.fees}</span>
                </div>
                <div className="flex justify-between text-xl font-light border-t border-gray-200 pt-4">
                  <span>總計</span>
                  <span className="text-red-600">NT$ {lotteryResult.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                  whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className={`w-full py-4 rounded-full font-light text-lg transition-colors ${
                    isProcessing
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      處理中...
                    </div>
                  ) : (
                    `立即付款 NT$ ${lotteryResult.total.toLocaleString()}`
                  )}
                </motion.button>

                <div className="text-center">
                  <Link href="/member">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                    >
                      稍後付款
                    </motion.button>
                  </Link>
                </div>
              </div>

              <div className="mt-8 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <div className="text-xs text-yellow-800 space-y-1">
                  <p>重要提醒</p>
                  <p>• 逾期未付費將自動取消票券</p>
                  <p>• 付費完成後無法退款</p>
                  <p>• 請確認個人資料正確</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
