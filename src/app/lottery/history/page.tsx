'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface RegistrationRecord {
  id: string;
  artist: string;
  tour: string;
  section: string;
  quantity: number;
  registrationDate: string;
  lotteryDate: string;
  status: 'registered' | 'cancelled' | 'won' | 'lost';
  result?: 'pending' | 'won' | 'lost';
  totalRegistrations: number;
}

export default function LotteryHistory() {
  const [records, setRecords] = useState<RegistrationRecord[]>([]);
  const [filter, setFilter] = useState<'all' | 'registered' | 'completed' | 'cancelled'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHistory = () => {
      try {
        // 從 localStorage 讀取真實登記記錄
        const registrationsStr = localStorage.getItem('lotteryRegistrations');
        let realRecords: RegistrationRecord[] = [];
        
        if (registrationsStr) {
          const registrations: Array<{
            id: string;
            artist: string;
            tour: string;
            section: string;
            quantity: number;
            registrationDate: string;
            status: string;
          }> = JSON.parse(registrationsStr);
          realRecords = registrations.map((reg) => ({
            id: reg.id,
            artist: reg.artist,
            tour: reg.tour,
            section: reg.section,
            quantity: reg.quantity,
            registrationDate: reg.registrationDate,
            lotteryDate: '2025.03.12',
            status: (reg.status as 'registered' | 'cancelled' | 'won' | 'lost') || 'registered',
            totalRegistrations: 3000
          }));
        }

        // 添加一些歷史模擬記錄
        const mockHistoryRecords: RegistrationRecord[] = [
          {
            id: 'hist-1',
            artist: 'BLACKPINK',
            tour: 'Born Pink World Tour',
            section: 'VIP區',
            quantity: 1,
            registrationDate: '2025.01.15T10:30:00Z',
            lotteryDate: '2025.01.20',
            status: 'won',
            result: 'won',
            totalRegistrations: 4200
          },
          {
            id: 'hist-2',
            artist: 'TWICE',
            tour: '5TH WORLD TOUR',
            section: 'A區',
            quantity: 2,
            registrationDate: '2024.12.10T14:20:00Z',
            lotteryDate: '2024.12.15',
            status: 'lost',
            result: 'lost',
            totalRegistrations: 3100
          },
          {
            id: 'hist-3',
            artist: 'aespa',
            tour: 'MY WORLD',
            section: 'B區',
            quantity: 1,
            registrationDate: '2024.11.25T16:45:00Z',
            lotteryDate: '2024.11.30',
            status: 'cancelled',
            totalRegistrations: 1200
          }
        ];

        // 合併真實記錄和歷史記錄
        const allRecords = [...realRecords, ...mockHistoryRecords];
        setRecords(allRecords.sort((a, b) => 
          new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()
        ));
      } catch (error) {
        console.error('Error loading history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();

    // 監聽登記狀態變化
    const handleAuthChange = () => {
      loadHistory();
    };

    window.addEventListener('authStateChanged', handleAuthChange);

    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange);
    };
  }, []);

  const filteredRecords = records.filter(record => {
    if (filter === 'all') return true;
    if (filter === 'registered') return record.status === 'registered';
    if (filter === 'completed') return record.status === 'won' || record.status === 'lost';
    if (filter === 'cancelled') return record.status === 'cancelled';
    return true;
  });

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

  const stats = {
    total: records.length,
    won: records.filter(r => r.status === 'won').length,
    lost: records.filter(r => r.status === 'lost').length,
    cancelled: records.filter(r => r.status === 'cancelled').length,
    active: records.filter(r => r.status === 'registered').length
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white -mt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">載入登記歷史中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white -mt-20">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
                抽選登記歷史
              </h1>
              <p className="text-lg text-gray-600 font-light">
                查看您所有的抽選登記記錄
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 text-center">
                <div className="text-2xl font-light text-gray-900 mb-2">{stats.total}</div>
                <div className="text-sm text-gray-600">總登記次數</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 sm:p-6 text-center">
                <div className="text-2xl font-light text-green-600 mb-2">{stats.won}</div>
                <div className="text-sm text-green-800">中選次數</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-6 text-center">
                <div className="text-2xl font-light text-gray-600 mb-2">{stats.lost}</div>
                <div className="text-sm text-gray-600">未中選次數</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-6 text-center">
                <div className="text-2xl font-light text-blue-600 mb-2">{stats.active}</div>
                <div className="text-sm text-blue-800">進行中</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 sm:p-6 text-center">
                <div className="text-2xl font-light text-red-600 mb-2">{stats.cancelled}</div>
                <div className="text-sm text-red-800">已取消</div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center space-x-4 border-b border-gray-200 overflow-x-auto">
              {[
                { id: 'all', label: '全部' },
                { id: 'registered', label: '進行中' },
                { id: 'completed', label: '已完成' },
                { id: 'cancelled', label: '已取消' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as 'all' | 'registered' | 'completed' | 'cancelled')}
                  className={`pb-4 font-light transition-colors whitespace-nowrap text-sm sm:text-base ${
                    filter === tab.id
                      ? 'text-gray-900 border-b-2 border-gray-900'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Records List */}
            {filteredRecords.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-4xl text-gray-300 mb-4">記錄</div>
                <h2 className="text-2xl font-light text-gray-900 mb-4">沒有符合條件的記錄</h2>
                <p className="text-gray-600 font-light mb-8">嘗試調整篩選條件或開始新的登記</p>
                <Link href="/tickets">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-gray-900 text-white rounded-full font-light hover:bg-gray-800 transition-colors"
                  >
                    瀏覽演出
                  </motion.button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredRecords.map((record, index) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="bg-gray-50 rounded-2xl p-6 sm:p-8"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg font-light text-gray-900">{record.artist}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                            {getStatusText(record.status)}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{record.tour}</p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">區域</span>
                            <p className="font-medium">{record.section}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">數量</span>
                            <p className="font-medium">{record.quantity} 張</p>
                          </div>
                          <div>
                            <span className="text-gray-500">登記人數</span>
                            <p className="font-medium">{record.totalRegistrations}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">登記時間</span>
                            <p className="font-medium">
                              {new Date(record.registrationDate).toLocaleDateString('zh-TW')}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Link href={`/lottery/details/${record.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-light hover:bg-blue-700 transition-colors"
                          >
                            查看詳情
                          </motion.button>
                        </Link>
                        
                        {record.status === 'registered' && (
                          <Link href={`/lottery/cancel/${record.id}`}>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="px-4 py-2 border border-red-300 text-red-600 rounded-full text-sm font-light hover:border-red-400 transition-colors"
                            >
                              取消
                            </motion.button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Success Rate */}
            {stats.total > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-light text-gray-900 mb-6">您的抽選統計</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">成功率分析</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">總登記次數</span>
                        <span className="font-medium">{stats.total}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">中選次數</span>
                        <span className="font-medium text-green-600">{stats.won}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">中選率</span>
                        <span className="font-medium text-blue-600">
                          {stats.total > 0 ? ((stats.won / (stats.total - stats.active - stats.cancelled)) * 100).toFixed(1) : 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">偏好分析</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">最常選擇區域</span>
                        <span className="font-medium">A區</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">平均登記數量</span>
                        <span className="font-medium">
                          {(records.reduce((sum, r) => sum + r.quantity, 0) / records.length || 0).toFixed(1)} 張
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">最愛藝人</span>
                        <span className="font-medium">NewJeans</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Return Button */}
            <div className="text-center">
              <Link href="/my-tickets">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
                >
                  返回會員中心
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
