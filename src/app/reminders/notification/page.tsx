'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ReminderNotification() {
  const searchParams = useSearchParams();
  
  // 從 URL 查詢參數獲取事件資料
  const artist = searchParams.get('artist') || 'TWICE';
  const title = searchParams.get('title') || '5TH WORLD TOUR';
  const date = searchParams.get('date') || '2025.06.15';
  const venue = searchParams.get('venue') || '台北小巨蛋';
  const price = searchParams.get('price') || '4,500';
  const eventId = searchParams.get('id') || '1';


  function getDiff(diff: number){
    let diffHour, diffMin, diffSec;
    diffHour= Math.floor(diff / 1000 / 60 / 60)
    diff -= diffHour * (1000 * 60 * 60)
    diffMin= Math.floor(diff / 1000 / 60)
    diff -= diffMin * (1000 * 60)
    diffSec= Math.floor(diff / 1000)
    return {diffHour, diffMin, diffSec}
}

  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  // 模擬倒計時
  useEffect(() => {
    const dateTime = new Date(date);
    const now = new Date();
    const res = getDiff(dateTime.getTime() - now.getTime());
    setTimeLeft({
      hours: res.diffHour,
      minutes: res.diffMin,
      seconds: res.diffSec
    });
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }
        if (newHours < 0) {
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 使用從 URL 獲取的資料，如果沒有則使用預設值
  const eventData = {
    artist: artist,
    tour: title,
    date: date,
    time: '19:00',
    venue: venue,
    saleDate: date.split('.').slice(0, 2).join('.') + '.01', // 假設開賣日期為該月1號
    saleTime: '10:00',
    prices: {
      vip: parseInt(price.replace(',', '')) + 300,
      a: parseInt(price.replace(',', '')),
      b: parseInt(price.replace(',', '')) - 500,
      c: parseInt(price.replace(',', '')) - 1000
    }
  };

  return (
    <div className="min-h-screen bg-white -mt-20">
      {/* Header */}
      <section className="pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Alert Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto"
            >
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 01-15 0v-5h5l-5-5-5 5h5v5a7.5 7.5 0 0015 0z" />
              </svg>
            </motion.div>

            <div className="space-y-4">
              <span className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                購票提醒
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900">
                {eventData.artist} 即將開賣！
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 font-light">
                距離開賣還有
              </p>
            </div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-gray-50 rounded-2xl p-8 sm:p-12"
            >
              <div className="grid grid-cols-3 gap-6 sm:gap-8 text-center">
                <div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-2">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">小時</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-2">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">分鐘</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-2">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">秒</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Event Details */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Event Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-light text-gray-900">演出資訊</h2>
              
              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-light text-gray-900 mb-2">
                      {eventData.artist}
                    </h3>
                    <p className="text-gray-600">{eventData.tour}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">演出日期</span>
                      <p className="text-gray-900 mt-1">{eventData.date} {eventData.time}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">演出場地</span>
                      <p className="text-gray-900 mt-1">{eventData.venue}</p>
                    </div>
                    <div className="sm:col-span-2 border-t border-gray-200 pt-3">
                      <span className="text-gray-500">開賣時間</span>
                      <p className="text-gray-900 mt-1 font-medium text-lg">
                        {eventData.saleDate} {eventData.saleTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Preview */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="text-lg font-light text-blue-900 mb-4">票價預覽</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">VIP區</span>
                    <span className="text-blue-900 font-medium">NT$ {eventData.prices.vip.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">A區</span>
                    <span className="text-blue-900 font-medium">NT$ {eventData.prices.a.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">B區</span>
                    <span className="text-blue-900 font-medium">NT$ {eventData.prices.b.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">C區</span>
                    <span className="text-blue-900 font-medium">NT$ {eventData.prices.c.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-light text-gray-900">準備購票</h2>
              
              <div className="space-y-4">
                <Link href={`/tickets/${eventId}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-red-600 text-white rounded-full font-light text-lg hover:bg-red-700 transition-colors"
                  >
                    立即前往購票
                  </motion.button>
                </Link>
                
                <Link href="/auth/login">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gray-900 text-white rounded-full font-light hover:bg-gray-800 transition-colors"
                  >
                    登入會員（更快購票）
                  </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
                >
                  分享給朋友
                </motion.button>
              </div>

              {/* Purchase Tips */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h4 className="text-green-900 font-medium mb-3">購票小貼士</h4>
                <div className="text-sm text-green-800 space-y-2">
                  <p>• 提前登入會員帳號</p>
                  <p>• 準備好付款方式</p>
                  <p>• 使用穩定的網路連線</p>
                  <p>• 避免使用VPN或代理伺服器</p>
                  <p>• 建議使用電腦或平板購票</p>
                </div>
              </div>

              {/* Reminder Actions */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-light text-gray-900 mb-4">提醒管理</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Link href={`/reminders/${eventId}/edit`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors text-sm"
                    >
                      編輯提醒
                    </motion.button>
                  </Link>
                  <Link href={`/reminders/${eventId}/cancel`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2 text-red-500 hover:text-red-600 transition-colors text-sm font-light"
                    >
                      取消提醒
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
