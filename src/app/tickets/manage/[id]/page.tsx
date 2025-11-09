'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import QRCodeGenerator from '@/components/QRCodeGenerator';

interface TicketData {
  id: string;
  artist: string;
  tour: string;
  date: string;
  time: string;
  venue: string;
  section: string;
  row: string;
  seat: string;
  quantity: number;
  ticketNumber: string;
  purchaseDate: string;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  canCancel: boolean;
  cancellationFee: number;
}

export default function TicketManagement({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // 模擬從 API 載入票券資料
    const loadTicketData = () => {
      const mockTicketData: TicketData = {
        id: resolvedParams.id,
        artist: 'NewJeans',
        tour: 'Get Up World Tour',
        date: '2025.03.15',
        time: '19:30',
        venue: '台北小巨蛋',
        section: 'A區',
        row: '12',
        seat: '15-16',
        quantity: 2,
        ticketNumber: 'NJ20250315-A-001234',
        purchaseDate: '2025.03.01',
        totalAmount: 6550,
        status: 'confirmed',
        canCancel: true,
        cancellationFee: 350
      };
      
      setTicketData(mockTicketData);
    };

    loadTicketData();
  }, [resolvedParams.id]);

  const handleCancelTicket = async () => {
    if (!ticketData) return;
    
    setIsProcessing(true);
    
    try {
      // 模擬取消票券 API 調用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 更新票券狀態
      setTicketData(prev => prev ? { ...prev, status: 'cancelled' } : null);
      setShowCancelModal(false);
      
      // 實際應用中會重新載入資料或更新狀態
    } catch (error) {
      console.error('Cancel ticket failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!ticketData) {
    return (
      <div className="min-h-screen bg-white -mt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">載入票券資料中...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return '已確認';
      case 'pending': return '待處理';
      case 'cancelled': return '已取消';
      default: return '未知';
    }
  };

  return (
    <div className="min-h-screen bg-white -mt-20">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">
                  票券管理
                </h1>
                <p className="text-lg text-gray-600 font-light">
                  管理您的演出票券
                </p>
              </div>
              
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(ticketData.status)}`}>
                {getStatusText(ticketData.status)}
              </span>
            </div>

            {/* Ticket Overview */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div>
                  <h3 className="text-xl font-light text-gray-900 mb-6">票券資訊</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">演出</span>
                        <p className="font-medium text-gray-900">{ticketData.artist}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">巡演</span>
                        <p className="font-medium text-gray-900">{ticketData.tour}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">日期</span>
                        <p className="font-medium text-gray-900">{ticketData.date}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">時間</span>
                        <p className="font-medium text-gray-900">{ticketData.time}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">場地</span>
                        <p className="font-medium text-gray-900">{ticketData.venue}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">座位</span>
                        <p className="font-medium text-gray-900">
                          {ticketData.section} {ticketData.row}排 {ticketData.seat}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR Code Preview */}
                <div className="text-center">
                  <h3 className="text-xl font-light text-gray-900 mb-6">入場 QR Code</h3>
                  <QRCodeGenerator 
                    data={`TICKET:${ticketData.id}:ENTRY:${ticketData.ticketNumber}`}
                    size="medium"
                    includeTimestamp={true}
                    expirationMinutes={60}
                  />
                </div>
              </div>
            </div>

            {/* Action Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href={`/tickets/digital/${ticketData.id}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-light hover:bg-blue-700 transition-colors"
                >
                  <div className="text-center">
                    <div className="text-lg mb-1">數位票券</div>
                    <div className="text-xs opacity-80">查看完整票券</div>
                  </div>
                </motion.button>
              </Link>

              <Link href={`/tickets/${ticketData.id}/seats`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 border border-gray-300 text-gray-600 rounded-2xl font-light hover:border-gray-400 transition-colors"
                >
                  <div className="text-center">
                    <div className="text-lg mb-1">座位圖</div>
                    <div className="text-xs opacity-80">查看座位位置</div>
                  </div>
                </motion.button>
              </Link>
            </div>

            {/* Ticket Management Options */}
            {ticketData.status === 'confirmed' && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-light text-gray-900 mb-6">票券管理</h3>
                
                <div className="space-y-6">
                  {/* Transfer Option */}
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-blue-900">轉讓票券</h4>
                      <p className="text-sm text-blue-700">將票券轉讓給其他人</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-full font-light hover:bg-blue-700 transition-colors"
                    >
                      轉讓
                    </motion.button>
                  </div>

                  {/* Cancel Option */}
                  {ticketData.canCancel && (
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                      <div>
                        <h4 className="font-medium text-red-900">取消票券</h4>
                        <p className="text-sm text-red-700">
                          取消票券並退款（扣除手續費 NT$ {ticketData.cancellationFee}）
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowCancelModal(true)}
                        className="px-4 py-2 bg-red-600 text-white rounded-full font-light hover:bg-red-700 transition-colors"
                      >
                        取消票券
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Purchase Details */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-light text-gray-900 mb-6">購買詳情</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">票券編號</span>
                    <span className="font-mono text-gray-900">{ticketData.ticketNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">購買日期</span>
                    <span className="text-gray-900">{ticketData.purchaseDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">票券數量</span>
                    <span className="text-gray-900">{ticketData.quantity} 張</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">付款金額</span>
                    <span className="text-gray-900">NT$ {ticketData.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">付款方式</span>
                    <span className="text-gray-900">信用卡</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">票券狀態</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticketData.status)}`}>
                      {getStatusText(ticketData.status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Return Button */}
            <div className="text-center">
              <Link href="/my-tickets">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
                >
                  返回票券列表
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full"
          >
            <h3 className="text-xl font-light text-gray-900 mb-4">確認取消票券</h3>
            
            <div className="space-y-4 mb-6">
              <p className="text-gray-600">
                您確定要取消此票券嗎？此動作無法復原。
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="text-sm text-red-800 space-y-2">
                  <p className="font-medium">取消費用明細</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>原票價</span>
                      <span>NT$ {(ticketData.totalAmount - 150).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>取消手續費</span>
                      <span>-NT$ {ticketData.cancellationFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t border-red-300 pt-1">
                      <span>退款金額</span>
                      <span>NT$ {(ticketData.totalAmount - 150 - ticketData.cancellationFee).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCancelModal(false)}
                disabled={isProcessing}
                className="flex-1 py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
              >
                取消
              </motion.button>
              
              <motion.button
                whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                onClick={handleCancelTicket}
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
