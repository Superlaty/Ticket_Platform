'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface WonTicket {
  id: string;
  artist: string;
  tour: string;
  eventDate: string;
  venue: string;
  section: string;
  quantity: number;
  price: number;
  paymentDeadline: string;
  lotteryNumber: string;
}

export default function LotteryWon({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [wonTicket, setWonTicket] = useState<WonTicket | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // 載入中選票券資訊
    const loadWonTicket = () => {
      const mockWonTicket: WonTicket = {
        id: resolvedParams.id,
        artist: 'NewJeans',
        tour: 'Get Up World Tour',
        eventDate: '2025.03.15 19:30',
        venue: '台北小巨蛋',
        section: 'A區',
        quantity: 2,
        price: 3200,
        paymentDeadline: '2025.03.14 23:59',
        lotteryNumber: 'NJ20250315-A-001234'
      };
      
      setWonTicket(mockWonTicket);
    };

    loadWonTicket();
  }, [resolvedParams.id]);

  // 付費期限倒數計時
  useEffect(() => {
    if (!wonTicket) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const deadline = new Date(wonTicket.paymentDeadline).getTime();
      const difference = deadline - now;

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
  }, [wonTicket]);

  const addToCart = () => {
    if (!wonTicket) return;
    
    // 將中選票券加入購物車
    const ticketCartItem = {
      id: Date.now(),
      name: `${wonTicket.artist} 演出票券`,
      artist: wonTicket.artist,
      price: wonTicket.price,
      quantity: wonTicket.quantity,
      image: 'bg-gradient-to-br from-orange-400 to-pink-500',
      inStock: true,
      type: 'ticket' as const,
      ticketInfo: {
        eventDate: wonTicket.eventDate,
        venue: wonTicket.venue,
        section: wonTicket.section,
        paymentDeadline: wonTicket.paymentDeadline,
        isWon: true
      }
    };

    // 保存到 localStorage（實際應用中會使用狀態管理）
    const existingCart = localStorage.getItem('cartItems');
    const cartItems = existingCart ? JSON.parse(existingCart) : [];
    cartItems.push(ticketCartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // 觸發購物車更新事件
    window.dispatchEvent(new Event('cartUpdated'));
    
    // 重定向到購物車
    router.push('/cart');
  };

  if (!wonTicket) {
    return (
      <div className="min-h-screen bg-white -mt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">載入中選資訊中...</p>
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
            {/* Congratulations Header */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              
              <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
                恭喜中選！
              </h1>
              <p className="text-lg text-gray-600 font-light">
                您已成功抽中票券，請完成付費
              </p>
            </div>

            {/* Payment Deadline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-red-50 border border-red-200 rounded-2xl p-6"
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
                      <div className="bg-white rounded-xl p-3 shadow-sm">
                        <div className="text-2xl font-light text-red-600">
                          {item.value.toString().padStart(2, '0')}
                        </div>
                      </div>
                      <div className="text-xs text-red-700 mt-2">{item.label}</div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-red-700">
                  付費期限：{wonTicket.paymentDeadline}
                </p>
              </div>
            </motion.div>

            {/* Ticket Details */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="text-lg font-light text-green-900 mb-4">中選詳情</h3>
              
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-green-700">中選號碼</span>
                    <p className="font-mono text-green-900 mt-1">{wonTicket.lotteryNumber}</p>
                  </div>
                  <div>
                    <span className="text-green-700">演出</span>
                    <p className="text-green-900 mt-1">{wonTicket.artist}</p>
                  </div>
                  <div>
                    <span className="text-green-700">巡演</span>
                    <p className="text-green-900 mt-1">{wonTicket.tour}</p>
                  </div>
                  <div>
                    <span className="text-green-700">演出時間</span>
                    <p className="text-green-900 mt-1">{wonTicket.eventDate}</p>
                  </div>
                  <div>
                    <span className="text-green-700">場地</span>
                    <p className="text-green-900 mt-1">{wonTicket.venue}</p>
                  </div>
                  <div>
                    <span className="text-green-700">座位</span>
                    <p className="text-green-900 mt-1">{wonTicket.section}</p>
                  </div>
                  <div>
                    <span className="text-green-700">數量</span>
                    <p className="text-green-900 mt-1">{wonTicket.quantity} 張</p>
                  </div>
                  <div>
                    <span className="text-green-700">票價</span>
                    <p className="text-green-900 mt-1">NT$ {wonTicket.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-lg font-light text-gray-900 mb-4">付費方式</h3>
              <p className="text-sm text-gray-600 mb-6">
                我們已將您的中選票券加入購物車，您可以：
              </p>
              
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addToCart}
                  className="w-full py-4 bg-orange-500 text-white rounded-full font-light text-lg hover:bg-orange-600 transition-colors"
                >
                  加入購物車立即付費
                </motion.button>
                
                <div className="text-center">
                  <Link href="/cart">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-gray-500 hover:text-gray-700 transition-colors font-light"
                    >
                      直接前往購物車
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <h4 className="font-medium text-yellow-900 mb-3">重要提醒</h4>
              <div className="text-sm text-yellow-800 space-y-2">
                <p>• 票券將加入您的購物車，與其他商品一起結帳</p>
                <p>• 逾期未付費將自動取消票券</p>
                <p>• 付費完成後無法退款，請確認資訊正確</p>
                <p>• 可在購物車中查看完整的費用明細</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
