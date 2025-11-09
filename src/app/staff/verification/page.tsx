'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TicketData {
  ticketNumber: string;
  holder: string;
  artist: string;
  tour: string;
  date: string;
  time: string;
  venue: string;
  section: string;
  row: string;
  seat: string;
  quantity: number;
  purchaseDate: string;
  isValid: boolean;
  isUsed: boolean;
  qrData: string;
}

export default function TicketVerification() {
  const [scanResult, setScanResult] = useState<TicketData | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [verificationHistory, setVerificationHistory] = useState([
    {
      id: 1,
      ticketNumber: 'NJ20250315-A-001234',
      holder: '林小美',
      section: 'A區',
      seat: '12排 15-16號',
      time: '18:45',
      status: 'verified'
    },
    {
      id: 2,
      ticketNumber: 'NJ20250315-B-002456',
      holder: '王大明',
      section: 'B區',
      seat: '8排 23號',
      time: '18:42',
      status: 'verified'
    },
    {
      id: 3,
      ticketNumber: 'NJ20250315-A-001111',
      holder: '張小華',
      section: 'A區',
      seat: '5排 10號',
      time: '18:40',
      status: 'duplicate'
    }
  ]);

  // 模擬掃描 QR Code
  const simulateScan = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      const mockTicket = {
        ticketNumber: 'NJ20250315-VIP-003789',
        holder: '陳小美',
        artist: 'NewJeans',
        tour: 'Get Up World Tour',
        date: '2025.03.15',
        time: '19:30',
        venue: '台北小巨蛋',
        section: 'VIP區',
        row: '3',
        seat: '15-16',
        quantity: 2,
        purchaseDate: '2025.03.01',
        isValid: true,
        isUsed: false,
        qrData: 'TICKET:003789:1647123456:abc123def456'
      };
      
      setScanResult(mockTicket);
      setIsScanning(false);
    }, 2000);
  };

  const verifyTicket = (action: 'approve' | 'reject') => {
    if (!scanResult) return;

    const newEntry = {
      id: verificationHistory.length + 1,
      ticketNumber: scanResult.ticketNumber,
      holder: scanResult.holder,
      section: scanResult.section,
      seat: `${scanResult.row}排 ${scanResult.seat}`,
      time: new Date().toLocaleTimeString('zh-TW', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      status: action === 'approve' ? 'verified' : 'rejected'
    };

    setVerificationHistory([newEntry, ...verificationHistory]);
    setScanResult(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'duplicate': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified': return '已驗證';
      case 'rejected': return '已拒絕';
      case 'duplicate': return '重複掃描';
      default: return '未知';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 -mt-20">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                工作人員專用
              </div>
              <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
                票券驗證系統
              </h1>
              <p className="text-lg text-gray-600 font-light">
                掃描 QR Code 驗證票券有效性
              </p>
            </div>

            {/* Scanner Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-light text-gray-900 mb-6">掃描票券</h3>
              
              <div className="text-center">
                {!isScanning && !scanResult && (
                  <div className="space-y-6">
                    <div className="w-48 h-48 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <div className="text-2xl mb-4 text-gray-400">掃描器</div>
                        <p className="text-gray-500">準備掃描 QR Code</p>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={simulateScan}
                      className="px-8 py-4 bg-blue-600 text-white rounded-full font-light text-lg hover:bg-blue-700 transition-colors"
                    >
                      開始掃描
                    </motion.button>
                  </div>
                )}

                {isScanning && (
                  <div className="space-y-6">
                    <div className="w-48 h-48 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center border-2 border-blue-200">
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-blue-600">掃描中...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Scan Result */}
            <AnimatePresence>
              {scanResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm"
                >
                  <h3 className="text-xl font-light text-gray-900 mb-6">掃描結果</h3>
                  
                  <div className={`p-6 rounded-2xl mb-6 ${
                    scanResult.isValid && !scanResult.isUsed 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                                          <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                            scanResult.isValid && !scanResult.isUsed ? 'bg-green-500' : 'bg-red-500'
                          }`}>
                            {scanResult.isValid && !scanResult.isUsed ? '有效' : '無效'}
                          </div>
                          <div>
                            <h4 className={`text-lg font-light ${
                              scanResult.isValid && !scanResult.isUsed 
                                ? 'text-green-900' 
                                : 'text-red-900'
                            }`}>
                              {scanResult.isValid && !scanResult.isUsed 
                                ? '票券有效' 
                                : scanResult.isUsed 
                                  ? '票券已使用' 
                                  : '票券無效'
                              }
                            </h4>
                            <p className={`text-sm ${
                              scanResult.isValid && !scanResult.isUsed 
                                ? 'text-green-700' 
                                : 'text-red-700'
                            }`}>
                              票券編號：{scanResult.ticketNumber}
                            </p>
                          </div>
                        </div>
                      </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">持票人</span>
                        <p className="font-medium">{scanResult.holder}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">演出</span>
                        <p className="font-medium">{scanResult.artist}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">座位</span>
                        <p className="font-medium">{scanResult.section} {scanResult.row}排 {scanResult.seat}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">數量</span>
                        <p className="font-medium">{scanResult.quantity} 張</p>
                      </div>
                      <div>
                        <span className="text-gray-500">購買日期</span>
                        <p className="font-medium">{scanResult.purchaseDate}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">場地</span>
                        <p className="font-medium">{scanResult.venue}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    {scanResult.isValid && !scanResult.isUsed ? (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => verifyTicket('approve')}
                          className="flex-1 py-3 bg-green-600 text-white rounded-full font-light hover:bg-green-700 transition-colors"
                        >
                          允許入場
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => verifyTicket('reject')}
                          className="px-6 py-3 border border-red-300 text-red-600 rounded-full font-light hover:border-red-400 transition-colors"
                        >
                          拒絕入場
                        </motion.button>
                      </>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setScanResult(null)}
                        className="flex-1 py-3 bg-gray-600 text-white rounded-full font-light hover:bg-gray-700 transition-colors"
                      >
                        繼續掃描
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Verification History */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-light text-gray-900">驗證記錄</h3>
                <div className="text-sm text-gray-500">
                  今日已驗證 {verificationHistory.filter(h => h.status === 'verified').length} 張
                </div>
              </div>
              
              <div className="space-y-4">
                {verificationHistory.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-900">{record.holder}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {getStatusText(record.status)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {record.section} {record.seat} • {record.ticketNumber}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {record.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="text-2xl font-light text-green-600 mb-2">
                  {verificationHistory.filter(h => h.status === 'verified').length}
                </div>
                <div className="text-sm text-gray-600">已驗證</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="text-2xl font-light text-red-600 mb-2">
                  {verificationHistory.filter(h => h.status === 'rejected').length}
                </div>
                <div className="text-sm text-gray-600">已拒絕</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="text-2xl font-light text-yellow-600 mb-2">
                  {verificationHistory.filter(h => h.status === 'duplicate').length}
                </div>
                <div className="text-sm text-gray-600">重複掃描</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
