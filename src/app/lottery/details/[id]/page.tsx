'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { formatDate } from '@/lib/dateFormat';

type EventRes = { 
  ticketTypeId: string,
  artist: string,
  eventName: string,
  eventTime: string,
  venue: string,
  ticketTypeName: string,
  quantity: number,
  registerTime: string,
  lotteryTime: string,
  paymentDeadline: string,
  status: string,
  total: number,
  totalTickets: number,
  id: string,
  drawTimeEnd: string
};

export default function RegistrationDetails() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [eventData, setEventData] = useState<EventRes>();

  // 開獎倒數計時
  useEffect(() => {
    if (!eventData || eventData.status !== "registered" ) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const lotteryTime = new Date(eventData.lotteryTime).getTime();
      const difference = lotteryTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [eventData]);

  if (!eventData) {
    return (
      <div className="min-h-screen bg-white -mt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl text-gray-300 mb-4">找不到</div>
          <h2 className="text-2xl font-light text-gray-900 mb-4">登記記錄不存在</h2>
          <Link href="/my-tickets">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gray-900 text-white rounded-full font-light hover:bg-gray-800 transition-colors"
            >
              返回會員中心
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registered': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'won': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'registered': return '等待開獎';
      case 'cancelled': return '已取消';
      case 'won': return '恭喜中選';
      case 'lost': return '未中選';
      default: return '未知狀態';
    }
  };

  // 檢查用戶是否已經登記這個活動
  
  const competitionRatio = (eventData.total / eventData.total).toFixed(1);

  return (
    <div className="min-h-screen bg-white -mt-20">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <h1 className="text-3xl sm:text-4xl font-light text-gray-900">
                  {'登記詳情'}
                </h1>
                {(
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(eventData.status)}`}>
                    {getStatusText(eventData.status)}
                  </span>
                )}
              </div>
              <p className="text-lg text-gray-600 font-light">
                查看您的抽選登記完整資訊
              </p>
            </div>

            {/* Countdown Timer for Active Registrations */}
            {eventData.status === 'registered' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8"
              >
                <div className="text-center">
                  <h3 className="text-lg font-light text-blue-900 mb-4">開獎倒數時間</h3>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    {[
                      { label: '天', value: timeLeft.days },
                      { label: '時', value: timeLeft.hours },
                      { label: '分', value: timeLeft.minutes },
                      { label: '秒', value: timeLeft.seconds }
                    ].map((item, index) => (
                      <div key={index} className="text-center">
                        <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm">
                          <div className="text-2xl sm:text-3xl font-light text-blue-600">
                            {item.value.toString().padStart(2, '0')}
                          </div>
                        </div>
                        <div className="text-xs text-blue-700 mt-2">{item.label}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-blue-700">
                    開獎時間：{formatDate(eventData.lotteryTime)} 
                  </p>
                </div>
              </motion.div>
            )}

            {/* Registration Information */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-light text-gray-900 mb-6">登記資訊</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 border-b border-gray-200 pb-2">演出詳情</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">演出名稱</span>
                      <span className="font-medium text-gray-900">{eventData.artist}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">巡演名稱</span>
                      <span className="font-medium text-gray-900">{eventData.eventName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">演出時間</span>
                      <span className="font-medium text-gray-900">{formatDate(eventData.eventTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">演出場地</span>
                      <span className="font-medium text-gray-900">{eventData.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Registration Details */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 border-b border-gray-200 pb-2">登記詳情</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">登記編號</span>
                      <span className="font-mono text-gray-900">{eventData.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">登記區域</span>
                      <span className="font-medium text-gray-900">{eventData.ticketTypeName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">登記數量</span>
                      <span className="font-medium text-gray-900">{eventData.quantity} 張</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">登記時間</span>
                      <span className="font-medium text-gray-900">
                        {formatDate(eventData.registerTime)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Competition Statistics */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-light text-gray-900 mb-6">競爭統計</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-light text-blue-600 mb-2">
                    {eventData.total}
                  </div>
                  <div className="text-sm text-blue-800">總登記票數</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-light text-green-600 mb-2">
                    {eventData.totalTickets}
                  </div>
                  <div className="text-sm text-green-800">可售票數</div>
                </div>
                
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl font-light text-orange-600 mb-2">
                    {(100 / parseFloat(competitionRatio)).toFixed(1)}%
                  </div>
                  <div className="text-sm text-orange-800">中獎機率</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-3">中選機率分析</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>您的登記區域 ({eventData.ticketTypeName})</span>
                    <span className="font-medium">{(100 / parseFloat(competitionRatio)).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${100 / parseFloat(competitionRatio)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    基於目前登記人數的估算，實際中選機率可能有所變動
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-light text-gray-900 mb-6">重要時程</h3>
              
              <div className="space-y-4">
                {[
                  {
                    title: '登記完成',
                    time: formatDate(eventData.registerTime),
                    status: 'completed',
                    description: '您已成功完成抽選登記'
                  },
                  {
                    title: '登記截止',
                    time: formatDate(eventData.drawTimeEnd),
                    status: eventData.status === 'registered' ? 'upcoming' : 'completed',
                    description: '所有登記將於此時間截止'
                  },
                  {
                    title: '抽選開獎',
                    time: formatDate(eventData.lotteryTime),
                    status: eventData.status === 'registered' ? 'upcoming' : 'completed',
                    description: '系統將進行公正抽選並公布結果'
                  },
                  {
                    title: '付費期限',
                    time: formatDate(eventData.paymentDeadline),
                    status: 'upcoming',
                    description: '中選者須於此期限前完成付費'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      item.status === 'completed' ? 'bg-green-500 text-white' :
                      item.status === 'upcoming' ? 'bg-blue-500 text-white' :
                      'bg-gray-300 text-gray-600'
                    }`}>
                      {item.status === 'completed' ? '✓' : index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-medium ${
                          item.status === 'completed' ? 'text-green-900' :
                          item.status === 'upcoming' ? 'text-blue-900' :
                          'text-gray-600'
                        }`}>
                          {item.title}
                        </h4>
                        <span className="text-sm text-gray-600">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {eventData.status === 'registered' && (
                // <Link href={`/lottery/cancel/${eventData.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-red-600 text-white rounded-full font-light hover:bg-red-700 transition-colors"
                    onClick={async()=>{localStorage.removeItem("lotteryRegistrations")}}
                  >
                    取消登記
                  </motion.button>
                // </Link>
              )}
              
              <Link href="/my-tickets">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
                >
                  返回票券管理
                </motion.button>
              </Link>
            </div>

            {/* Help Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h4 className="font-medium text-blue-900 mb-3">常見問題</h4>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-1">Q: 什麼時候會知道抽選結果？</p>
                  <p className="text-blue-800">A: 開獎當日 10:00 會進行抽選，結果將於當日下午透過電子郵件通知。</p>
                </div>
                
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-1">Q: 如果中選了該怎麼辦？</p>
                  <p className="text-blue-800">A: 收到中選通知後，請於付費期限前完成付款，逾期將視同放棄。</p>
                </div>
                
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-1">Q: 可以修改登記內容嗎？</p>
                  <p className="text-blue-800">A: 登記送出後無法修改，只能選擇取消重新登記（如仍在期限內）。</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
