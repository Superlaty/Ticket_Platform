'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { formatDate } from '@/lib/dateFormat';
type TicketData = {
  id: string;
  artist: string;
  tour?: string;
  eventTime: string;
  time?: string;
  venue: string;
  ticketTypeName: string;
  status: 'registered' | 'cancelled' | 'won' | 'lost' | 'confirmed' | 'used';
  quantity: number;
  registrationDate?: string;
  paymentDeadline?: string;
  eventId: string;
  ticketTypeId: string;
}


export default function MyTickets() {
  const [filter, setFilter] = useState<'all' | 'active' | 'upcoming' | 'lost' | 'history'>('all');
  let lotteryTicket = {
    eventId: "1",
    userId: "000",
    registrationId: "000",
    section: "普通票",
    quantity: 2
  };
  // const [isLoading, setIsLoading] = useState(true);
  const [myTicket, setMyticket] = useState<TicketData[]>([
  {
    id: '2',
    artist: 'NewJeans',
    tour: 'Get Up World Tour',
    eventTime: '2025-03-15T19:00:00.000Z',
    time: '19:30',
    venue: '台北小巨蛋',
    ticketTypeName: '普通票',
    status: 'confirmed',
    quantity: 2,
    registrationDate: '2024-06-01T12:00:00.000Z',
    paymentDeadline: '2024-06-15',
    eventId: '1',
    ticketTypeId: '2-1'
  },
   {
    id: '3',
    artist: 'BLACKPINK',
    tour: 'BLACKPINK Born Pink World Tour',
    eventTime: '2025-04-20T19:00:00.000Z',
    time: '19:30',
    venue: '台北小巨蛋',
    ticketTypeName: '普通票',
    status: 'won',
    quantity: 2,
    registrationDate: '2025-04-21T00:00:00.000Z',
    paymentDeadline: '2024-05-15',
    eventId: '2',
    ticketTypeId: '3-1'
  },
   {
    id: '4',
    artist: 'BTS',
    tour: 'BTS Yet To Come',
    eventTime: '2025-05-10T19:00:00.000Z',
    time: '19:30',
    venue: '高雄世運主場館',
    ticketTypeName: '普通票',
    status: 'lost',
    quantity: 2,
    registrationDate: '2024-06-01T12:00:00.000Z',
    paymentDeadline: '2024-06-15',
    eventId: '3',
    ticketTypeId: '4-1'
  },
  {
    id: '5',
    artist: 'IU',
    tour: 'IU The Golden Hour',
    eventTime: '2025-10-10T19:00:07.000Z',
    time: '19:30',
    venue: '台北小巨蛋',
    ticketTypeName: 'C區',
    status: 'used',
    quantity: 2,
    registrationDate: '2024-06-01T12:00:00.000Z',
    paymentDeadline: '2024-06-15',
    eventId: '4',
    ticketTypeId: '5-1'
  },
  {
    id: '6',
    artist: 'TWICE',
    tour: 'TWICE <THIS IS FOR> WORLD TOUR',
    eventTime: '2025-11-22T19:00:00.000Z',
    time: '19:30',
    venue: '高雄國家體育場',
    ticketTypeName: '普通票',
    status: 'cancelled',
    quantity: 2,
    registrationDate: '2025-11-12T12:00:00.000Z',
    paymentDeadline: '2025-11-15',
    eventId: '5',
    ticketTypeId: '6-1'
  }
]);

  useEffect(()=>{
    lotteryTicket = JSON.parse(localStorage.getItem("lotteryRegistrations") || JSON.stringify([lotteryTicket]))[0];
    const tix = {
      id: '1',
      artist: 'TWICE',
      tour: 'TWICE <THIS IS FOR> WORLD TOUR',
      eventTime: '2025-11-22T19:00:00.000Z',
      time: '19:30',
      venue: '高雄國家體育場',
      ticketTypeName: '普通票',
      status: 'registered' as const,
      quantity: lotteryTicket.quantity,
      registrationDate: '2025-11-12T12:00:00.000Z',
      paymentDeadline: '2025-11-15',
      eventId: '5',
      ticketTypeId: '1-1'
    };
    setMyticket([tix, ...myTicket]);
  }, [])

  const cancelTicket = (id: string) => {
    const confirm = window.confirm("是否取消登記");
    if (!confirm) {
      localStorage.removeItem("lotteryRegistrations");
      return;
    }
    try {
      // 將 localStorage 的 myTickets 中該票券狀態改為 'cancelled'
      const ticketsStr = localStorage.getItem('myTickets');
      if (ticketsStr) {
        try {
          const tickets: TicketData[] = JSON.parse(ticketsStr);
          const updatedTickets = tickets.map(ticket => 
            ticket.id === id 
              ? { ...ticket, status: 'cancelled' as const }
              : ticket
          );
          localStorage.setItem('myTickets', JSON.stringify(updatedTickets));
          
          // 更新本地狀態
          setMyticket(updatedTickets);
        } catch (e) {
          console.error('Error updating myTickets:', e);
        }
      }

      // 將 localStorage 的 lotteryRegistrations 中該登記記錄狀態改為 'cancelled'
      const registrationsStr = localStorage.getItem('lotteryRegistrations');
      if (registrationsStr) {
        try {
          const registrations = JSON.parse(registrationsStr);
          const updatedRegistrations = registrations.map(
            (reg: { registrationId?: string; id?: string; status?: string }) => 
              (reg.registrationId === id || reg.id === id)
                ? { ...reg, status: 'cancelled', cancelledDate: new Date().toISOString() }
                : reg
          );
          localStorage.setItem('lotteryRegistrations', JSON.stringify(updatedRegistrations));
        } catch (e) {
          console.error('Error updating lotteryRegistrations:', e);
        }
      }

    }
    catch(err){
      console.error('Cancel ticket error:', err);
      alert("取消失敗");
    }
  }

  // 計算每個標籤對應的票券數量
  const getTicketCount = (filterType: 'all' | 'active' | 'upcoming' | 'lost' | 'history') => {
    if (filterType === 'all') return myTicket.length;
    if (filterType === 'active') return myTicket.filter(t => t.status === 'won' || t.status === 'confirmed').length;
    if (filterType === 'upcoming') return myTicket.filter(t => t.status === 'registered').length;
    if (filterType === 'lost') return myTicket.filter(t => t.status === 'lost').length;
    if (filterType === 'history') return myTicket.filter(t => t.status === 'used' || t.status === 'cancelled').length;
    return 0;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registered': return 'bg-blue-100 text-blue-800';
      case 'won': return 'bg-orange-100 text-orange-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'used': return 'bg-gray-100 text-gray-600';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'lost': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'registered': return '等待開獎';
      case 'won': return '中選待付費';
      case 'confirmed': return '已確認';
      case 'used': return '已使用';
      case 'cancelled': return '已取消';
      case 'lost': return '未中選';
      default: return '未知';
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-white -mt-20 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
  //         <p className="text-gray-600">載入票券資料中...</p>
  //       </div>
  //     </div>
  //   );
  // }

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
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-4">
                我的票券
              </h1>
              <p className="text-lg text-gray-600 font-light">
                管理您的演出票券和抽選登記
              </p>
            </div>

            {/* Quick QR Access */}
            {myTicket.some(t => t.status == "confirmed") && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 sm:p-8"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 text-green-600">入場憑證</div>
                  <h3 className="text-xl font-light text-green-900 mb-4">快速出示 QR Code</h3>
                  <p className="text-green-800 mb-6">點擊下方按鈕立即顯示入場 QR Code</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {myTicket.filter(t => t.status == "confirmed").map(ticket => (
                      <Link key={ticket?.id} href={`/tickets/digital/${ticket?.id}`}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-white border border-green-300 rounded-xl p-4 hover:border-green-400 transition-colors"
                        >
                          <div className="text-center">
                            <h4 className="font-medium text-green-900">{ticket?.artist}</h4>
                            <p className="text-sm text-green-700">{formatDate(ticket?.eventTime)}</p>
                            <p className="text-xs text-green-600 mt-2">點擊顯示 QR Code</p>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Filter Tabs */}
            <div className="flex items-center space-x-4 border-b border-gray-200 overflow-x-auto">
              {[
                { id: 'all', label: '全部票券' },
                { id: 'active', label: '需要處理' },
                { id: 'upcoming', label: '等待開獎' },
                { id: 'lost', label: '未中選' },
                { id: 'history', label: '歷史記錄' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as 'all' | 'active' | 'upcoming' | 'lost' | 'history')}
                  className={`pb-4 font-light transition-colors whitespace-nowrap text-sm sm:text-base ${
                    filter === tab.id
                      ? 'text-gray-900 border-b-2 border-gray-900'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                  <span className="ml-1 text-xs">
                    ({getTicketCount(tab.id as 'all' | 'active' | 'upcoming' | 'lost' | 'history')})
                  </span>
                </button>
              ))}
            </div>

            {/* Tickets List */}
            {myTicket.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-4xl text-gray-300 mb-6">票券</div>
                <h2 className="text-2xl font-light text-gray-900 mb-4">沒有票券</h2>
                <p className="text-gray-600 font-light mb-8">開始登記演出抽選或瀏覽更多演出</p>
                <Link href="/tickets">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-orange-500 text-white rounded-full font-light text-lg hover:bg-orange-600 transition-colors"
                  >
                    瀏覽演出
                  </motion.button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {myTicket.map((ticket, index) => (
                  <motion.div
                    key={ticket?.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className={`rounded-2xl p-6 sm:p-8 border-2 ${
                      ticket?.status === 'confirmed' ? 'bg-green-50 border-green-200' :
                      ticket?.status === 'won' ? 'bg-orange-50 border-orange-200' :
                      ticket?.status === 'registered' ? 'bg-blue-50 border-blue-200' :
                      'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl font-light text-gray-900">{ticket?.artist}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket?.status)}`}>
                            {getStatusText(ticket?.status)}
                          </span>
                          {ticket?.status == "confirmed" && (
                            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                              QR Code 可用
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-4">{ticket.tour}</p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">演出時間</span>
                            <p className="font-medium">{formatDate(ticket?.eventTime)}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">場地</span>
                            <p className="font-medium">{ticket?.venue}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">票種</span>
                            <p className="font-medium">{ticket?.ticketTypeName}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">數量</span>
                            <p className="font-medium">{ticket?.quantity} 張</p>
                          </div>
                        </div>

                        {/* Payment Deadline Warning */}
                        {ticket.paymentDeadline && ticket.status == "won" && (
                          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-sm text-red-800">
                              <span className="font-medium">付費期限：</span>
                              {ticket?.paymentDeadline}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col space-y-3 lg:w-48">
                        {/* Primary Action - QR Code */}
                        {ticket?.status == "confirmed" && (
                          <Link href={`/tickets/digital/${ticket?.id}`}>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full py-4 bg-purple-600 text-white rounded-full font-medium text-lg hover:bg-purple-700 transition-colors"
                            >
                              顯示 QR Code
                            </motion.button>
                          </Link>
                        )}
                        
                        {/* Secondary Actions */}
                        <div className="grid grid-cols-2 gap-2">
                          {ticket?.status === 'won' && (
                            <Link href="/cart">
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-2 bg-orange-500 text-white rounded-full font-light text-sm hover:bg-orange-600 transition-colors"
                              >
                                立即付費
                              </motion.button>
                            </Link>
                          )}
                          
                          <Link href={`/lottery/details/${ticket?.ticketTypeId}`}>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full py-2 border border-gray-300 text-gray-600 rounded-full font-light text-sm hover:border-gray-400 transition-colors"
                            >
                              查看詳情
                            </motion.button>
                          </Link>
                          {ticket.status === 'registered' && (
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-2 text-red-500 hover:text-red-600 transition-colors font-light text-sm"
                                onClick={async()=>{cancelTicket(ticket.id)}}
                              >
                                取消登記
                              </motion.button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-light text-gray-900 mb-6">快速操作</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/tickets">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-orange-500 text-white rounded-2xl font-light hover:bg-orange-600 transition-colors"
                  >
                    <div className="text-center">
                      <div className="text-lg mb-1">瀏覽演出</div>
                      <div className="text-xs opacity-80">發現更多精彩</div>
                    </div>
                  </motion.button>
                </Link>

                <Link href="/lottery/history">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-light hover:bg-blue-700 transition-colors"
                  >
                    <div className="text-center">
                      <div className="text-lg mb-1">抽選歷史</div>
                      <div className="text-xs opacity-80">查看所有記錄</div>
                    </div>
                  </motion.button>
                </Link>

                <Link href="/member">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 border border-gray-300 text-gray-600 rounded-2xl font-light hover:border-gray-400 transition-colors"
                  >
                    <div className="text-center">
                      <div className="text-lg mb-1">會員設定</div>
                      <div className="text-xs opacity-80">個人資料管理</div>
                    </div>
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h4 className="font-medium text-blue-900 mb-3">使用說明</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-blue-800">
                <div>
                  <p className="font-medium mb-2">如何出示 QR Code：</p>
                  <ol className="space-y-1 text-xs">
                    <li>1. 點擊票券的「顯示 QR Code」按鈕</li>
                    <li>2. 系統會生成限時 QR Code</li>
                    <li>3. 在演出現場向工作人員出示</li>
                    <li>4. 請同時準備身分證件核對</li>
                  </ol>
                </div>
                <div>
                  <p className="font-medium mb-2">票券狀態說明：</p>
                  <ul className="space-y-1 text-xs">
                    <li>• <strong>等待開獎：</strong>抽選結果尚未公布</li>
                    <li>• <strong>中選待付費：</strong>請盡快完成付費</li>
                    <li>• <strong>已確認：</strong>可以出示 QR Code 入場</li>
                    <li>• <strong>已使用：</strong>已完成入場驗證</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
