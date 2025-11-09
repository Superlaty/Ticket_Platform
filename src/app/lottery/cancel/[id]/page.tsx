'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface RegistrationData {
  id: string;
  eventId: string;
  userId: string;
  artist: string;
  tour: string;
  date: string;
  time: string;
  venue: string;
  section: string;
  quantity: number;
  registrationDate: string;
  lotteryDate: string;
  status: 'registered' | 'cancelled' | 'won' | 'lost';
  canCancel: boolean;
  estimatedOdds: string;
  totalRegistrations: number;
}

export default function CancelRegistration({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [registration, setRegistration] = useState<RegistrationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const loadRegistration = () => {
      try {
        // 從 localStorage 讀取登記資料
        const registrationsStr = localStorage.getItem('lotteryRegistrations');
        if (registrationsStr) {
          const registrations: RegistrationData[] = JSON.parse(registrationsStr);
          const foundRegistration = registrations.find(reg => reg.id === resolvedParams.id);
          
          if (foundRegistration) {
            // 添加模擬資料
            const enhancedRegistration: RegistrationData = {
              ...foundRegistration,
              date: '2025.03.15',
              time: '19:30',
              venue: '台北小巨蛋',
              lotteryDate: '2025.03.12',
              canCancel: foundRegistration.status === 'registered',
              estimatedOdds: '2.5x',
              totalRegistrations: 3100
            };
            setRegistration(enhancedRegistration);
          } else {
            // 模擬資料
            const mockRegistration: RegistrationData = {
              id: resolvedParams.id,
              eventId: 'newjeans-get-up-tour',
              userId: 'user123',
              artist: 'NewJeans',
              tour: 'Get Up World Tour',
              date: '2025.03.15',
              time: '19:30',
              venue: '台北小巨蛋',
              section: 'A區',
              quantity: 2,
              registrationDate: new Date().toISOString(),
              lotteryDate: '2025.03.12',
              status: 'registered',
              canCancel: true,
              estimatedOdds: '2.5x',
              totalRegistrations: 3100
            };
            setRegistration(mockRegistration);
          }
        }
      } catch (error) {
        console.error('Error loading registration:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRegistration();
  }, [resolvedParams.id]);

  const handleCancelRegistration = async () => {
    if (!registration) return;
    
    setIsProcessing(true);
    
    try {
      // 更新 localStorage 中的登記狀態
      const registrationsStr = localStorage.getItem('lotteryRegistrations');
      if (registrationsStr) {
        const registrations: RegistrationData[] = JSON.parse(registrationsStr);
        const updatedRegistrations = registrations.map(reg => 
          reg.id === registration.id 
            ? { ...reg, status: 'cancelled' as const, cancelledDate: new Date().toISOString() }
            : reg
        );
        localStorage.setItem('lotteryRegistrations', JSON.stringify(updatedRegistrations));
      }

      // 模擬 API 調用
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 觸發狀態變化事件
      window.dispatchEvent(new Event('authStateChanged'));
      
      // 重定向到會員中心
      router.push('/my-tickets?message=registration-cancelled');
    } catch (error) {
      console.error('Cancel registration failed:', error);
    } finally {
      setIsProcessing(false);
      setShowConfirmModal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white -mt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">載入登記資料中...</p>
        </div>
      </div>
    );
  }

  if (!registration) {
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
              返回我的票券
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
      case 'won': return '中選';
      case 'lost': return '未中選';
      default: return '未知';
    }
  };

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
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
                取消抽選登記
              </h1>
              <p className="text-lg text-gray-600 font-light">
                確認取消您的演出抽選登記
              </p>
            </div>

            {/* Registration Details */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-light text-gray-900">登記詳情</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(registration.status)}`}>
                  {getStatusText(registration.status)}
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">演出</span>
                    <p className="font-medium text-gray-900">{registration.artist}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">巡演</span>
                    <p className="font-medium text-gray-900">{registration.tour}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">演出時間</span>
                    <p className="font-medium text-gray-900">{registration.date} {registration.time}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">場地</span>
                    <p className="font-medium text-gray-900">{registration.venue}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">登記區域</span>
                    <p className="font-medium text-gray-900">{registration.section}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">登記數量</span>
                    <p className="font-medium text-gray-900">{registration.quantity} 張</p>
                  </div>
                  <div>
                    <span className="text-gray-500">登記人數</span>
                    <p className="font-medium text-gray-900">{registration.totalRegistrations}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">開獎日期</span>
                    <p className="font-medium text-gray-900">{registration.lotteryDate}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-sm">
                    <span className="text-gray-500">登記時間：</span>
                    <span className="text-gray-900">
                      {new Date(registration.registrationDate).toLocaleString('zh-TW')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cancel Warning */}
            {registration.canCancel ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                <h4 className="font-medium text-yellow-900 mb-3">取消須知</h4>
                <div className="text-sm text-yellow-800 space-y-2">
                  <p>• 取消登記後將無法恢復</p>
                  <p>• 無法重新登記同一場演出</p>
                  <p>• 建議在開獎前謹慎考慮</p>
                  <p>• 取消不會產生任何費用</p>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <h4 className="font-medium text-red-900 mb-3">無法取消</h4>
                <div className="text-sm text-red-800">
                  此登記已無法取消，可能原因：
                  <ul className="mt-2 space-y-1">
                    <li>• 已超過取消期限</li>
                    <li>• 抽選結果已公布</li>
                    <li>• 登記狀態已變更</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-4 flex flex-col">
              {registration.canCancel ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowConfirmModal(true)}
                    className="w-full py-4 bg-red-600 text-white rounded-full font-light text-lg hover:bg-red-700 transition-colors"
                  >
                    確認取消登記
                  </motion.button>
                  
                  <Link href="/my-tickets">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
                    >
                      返回我的票券
                    </motion.button>
                  </Link>
                </>
              ) : (
                <Link href="/my-tickets">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gray-900 text-white rounded-full font-light text-lg hover:bg-gray-800 transition-colors"
                  >
                    返回我的票券
                  </motion.button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full"
          >
            <h3 className="text-xl font-light text-gray-900 mb-4">最後確認</h3>
            
            <div className="space-y-4 mb-6">
              <p className="text-gray-600">
                您確定要取消此抽選登記嗎？
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="text-sm text-red-800 space-y-2">
                  <p className="font-medium">取消後將無法：</p>
                  <ul className="text-xs space-y-1 ml-4">
                    <li>• 重新登記同一場演出</li>
                    <li>• 參與此次抽選</li>
                    <li>• 恢復登記資格</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">取消的登記：</p>
                  <p>{registration.artist} - {registration.section} × {registration.quantity} 張</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowConfirmModal(false)}
                disabled={isProcessing}
                className="flex-1 py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
              >
                保留登記
              </motion.button>
              
              <motion.button
                whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                onClick={handleCancelRegistration}
                disabled={isProcessing}
                className={`flex-1 py-3 rounded-full font-light transition-colors ${
                  isProcessing
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    處理中...
                  </div>
                ) : (
                  '確認取消'
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
