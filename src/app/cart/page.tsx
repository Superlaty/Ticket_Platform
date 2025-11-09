'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface CartItem {
  id: string;
  name: string;
  artist: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  size?: string;
  color?: string;
  image: string;
  inStock: boolean;
  memberDiscount?: number;
  type: 'merchandise' | 'ticket';
  ticketInfo?: {
    eventDate: string;
    venue: string;
    section: string;
    paymentDeadline?: string;
    isWon?: boolean;
  };
}

type TicketData = {
  id: string[];
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
  qrAvailable: boolean;
  eventId: string;
  ticketTypeId: string;
  eventName?: string;
  price?: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "2",
      name: 'BLACKPINK Born Pink World Tour',
      artist: 'BLACKPINK',
      price: 100,
      quantity: 2,
      image: '/banner-2.jpg',
      inStock: true,
      type: 'ticket',
      ticketInfo: {
        eventDate: '2025.04.20 19:00',
        venue: '台北小巨蛋',
        section: '普通票',
        paymentDeadline: '2025.05.15 23:59',
        isWon: true
      }
    }
  ]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{name: string; memberLevel: string} | null>(null);

  // 檢查登入狀態
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const loginStatus = localStorage.getItem('isLoggedIn');
        const userData = localStorage.getItem('userData');
        
        if (loginStatus === 'true' && userData) {
          setIsLoggedIn(true);
          const user = JSON.parse(userData);
          setUserInfo({
            name: user.name,
            memberLevel: user.memberLevel || '一般會員'
          });
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };

    checkAuthStatus();

    const handleAuthChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('authStateChanged', handleAuthChange);

    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange);
    };
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: string) => {
    const confirm = window.confirm("是否取消登記？");
    if (!confirm) {
      localStorage.removeItem("lotteryRegistrations");
      return;
    }

    try {
      // 更新 localStorage 中的票券狀態
      const ticketsStr = localStorage.getItem('myTickets');
      if (ticketsStr) {
        try {
          const tickets: TicketData[] = JSON.parse(ticketsStr);
          const updatedTickets = tickets.map(ticket => 
            ticket.id[0] === id 
              ? { ...ticket, status: 'cancelled' as const }
              : ticket
          );
          localStorage.setItem('myTickets', JSON.stringify(updatedTickets));
          
          // 更新購物車狀態
          setCartItems(cartItems.filter(item => item.id !== id));
        } catch (e) {
          console.error('Error updating myTickets:', e);
        }
      }

      // 更新 lotteryRegistrations
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
      
    } catch(err) {
      console.error('Cancel ticket error:', err);
      alert("取消失敗");
    }
  };

  // 分別計算票券和商品價格
  const ticketItems = cartItems.filter(item => item.type === 'ticket');
  
  return (
    <div className="min-h-screen bg-white -mt-20">
      {/* Header */}
      <section className="pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900">購物車</h1>
                <p className="text-lg sm:text-xl text-gray-600 font-light">
                  {cartItems.length} 張登記中的票券
                  {isLoggedIn && userInfo && (
                    <span className="ml-2 text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {userInfo.memberLevel}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {cartItems.length === 0 ? (
            /* Empty Cart */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16 sm:py-20"
            >
              <div className="text-4xl sm:text-6xl text-gray-300 mb-6 sm:mb-8">購物車</div>
              <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">目前沒有登記中的票券</h2>
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
            </motion.div>
          ) : (
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-12">
              
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Tickets Section */}
                {cartItems.filter(item => item.type === 'ticket').length > 0 && (
                  <div>
                    <div className="flex items-center space-x-3 mb-6">
                      <h3 className="text-xl font-light text-gray-900">登記中的票券</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        等待開獎
                      </span>
                    </div>
                    
                    <div className="space-y-6">
                      {cartItems.filter(item => item.type === 'ticket').map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.6 }}
                          className="bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8"
                        >
                          <div className="flex flex-col sm:flex-row gap-6">
                            {/* Ticket Image */}
                            <Image
                              src={item.image}
                              alt="票券圖片"
                              className="h-28 w-auto object-contain"
                              height={256}
                              width={256}
                            />

                            {/* Ticket Info */}
                            <div className="flex-1 space-y-4">
                              <div>
                                <div className="flex items-center space-x-2 mb-2">
                                  <h3 className="text-lg sm:text-xl font-light text-gray-900">
                                    {item.name}
                                  </h3>
                                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                    登記中
                                  </span>
                                </div>
                                
                                <p className="text-sm text-gray-600">{item.artist}</p>
                                
                                {item.ticketInfo && (
                                  <div className="space-y-1 text-xs text-gray-500">
                                    <p>演出時間：{item.ticketInfo.eventDate}</p>
                                    <p>場地：{item.ticketInfo.venue}</p>
                                    <p>座位：{item.ticketInfo.section}</p>
                                    {item.ticketInfo.paymentDeadline && (
                                      <p className="text-red-600 font-medium">
                                        付費期限：{item.ticketInfo.paymentDeadline}
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <span className="text-lg font-light text-gray-900">
                                    NT$ {item.price.toLocaleString()}
                                  </span>
                                  <span className="text-sm text-gray-600">
                                    × {item.quantity} 張
                                  </span>
                                </div>
                                
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => removeItem(item.id)}
                                  className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                  title="取消登記"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Merchandise Section */}
                {cartItems.filter(item => item.type === 'merchandise').length > 0 && (
                  <div>
                    <h3 className="text-xl font-light text-gray-900 mb-6">商品</h3>
                    
                    <div className="space-y-6">
                      {cartItems.filter(item => item.type === 'merchandise').map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="bg-gray-50 rounded-2xl p-6 sm:p-8"
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      <Image
                        src={item.image}
                        alt="商品圖片"
                        className="h-28 w-auto object-contain"
                        height={256}
                        width={256}
                      />

                      {/* Product Info */}
                      <div className="flex-1 space-y-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg sm:text-xl font-light text-gray-900">
                              {item.name}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.type === 'ticket' 
                                ? 'bg-orange-100 text-orange-800' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {item.type === 'ticket' ? '演出票券' : '商品'}
                            </span>
                            {item.ticketInfo?.isWon && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                中選
                              </span>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-600">{item.artist}</p>
                          
                          {/* Ticket specific info */}
                          {item.type === 'ticket' && item.ticketInfo && (
                            <div className="space-y-1 text-xs text-gray-500">
                              <p>演出時間：{item.ticketInfo.eventDate}</p>
                              <p>場地：{item.ticketInfo.venue}</p>
                              <p>座位：{item.ticketInfo.section}</p>
                              {item.ticketInfo.paymentDeadline && (
                                <p className="text-orange-600 font-medium">
                                  付費期限：{item.ticketInfo.paymentDeadline}
                                </p>
                              )}
                            </div>
                          )}
                          
                          {/* Merchandise specific info */}
                          {item.type === 'merchandise' && (
                            <div className="space-y-1 text-xs text-gray-500">
                              {item.size && <p>尺寸：{item.size}</p>}
                              {item.color && <p>顏色：{item.color}</p>}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex flex-col space-y-1">
                            <div className="flex items-center space-x-4">
                              <span className="text-lg font-light text-gray-900">
                                NT$ {item.price.toLocaleString()}
                              </span>
                              {item.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                  NT$ {item.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                            
                            {/* Member Discount Badge */}
                            {isLoggedIn && item.memberDiscount && (
                              <div className="flex items-center space-x-2">
                                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                  會員折扣 -{item.memberDiscount}%
                                </span>
                                <span className="text-xs text-green-600 font-medium">
                                  省 NT$ {Math.round(item.price * item.quantity * (item.memberDiscount / 100)).toLocaleString()}
                                </span>
                              </div>
                            )}
                            
                            {/* Stock Status */}
                            {!item.inStock && (
                              <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full self-start">
                                缺貨中
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between sm:justify-end space-x-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-3">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                              >
                                −
                              </motion.button>
                              <span className="text-lg font-light min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                              >
                                +
                              </motion.button>
                            </div>

                            {/* Remove Button */}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-2"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Registration Summary */}
              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 h-fit">
                <h3 className="text-xl font-light text-gray-900 mb-6">登記摘要</h3>
                
                <div className="space-y-4 mb-6">
                  {/* Tickets Section */}
                  {ticketItems.length > 0 && (
                    <div className="border-b border-gray-200 pb-3 mb-3">
                      <h4 className="font-medium text-gray-900 mb-2">登記中的票券</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">登記數量</span>
                          <span>{ticketItems.reduce((sum, item) => sum + item.quantity, 0)} 張</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">登記場次</span>
                          <span>{ticketItems.length} 場</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Registration Status Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                    <div className="text-sm text-blue-800 text-center">
                      <p className="font-medium mb-1">等待開獎結果</p>
                      <p className="text-xs">開獎後將通知您抽選結果</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-3">
                  <Link href="/my-tickets">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gray-900 text-white rounded-full font-light text-lg hover:bg-gray-800 transition-colors"
                    >
                      查看我的票券
                    </motion.button>
                  </Link>
                  
                  <Link href="/tickets">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
                    >
                      瀏覽更多演出
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>


      {/* Related Tickets */}
      {cartItems.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">相關演出推薦</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                { 
                  artist: 'NewJeans', 
                  tour: 'Get Up World Tour',
                  date: '2025.03.15',
                  status: 'lottery',
                  related: cartItems.some(item => item.artist === 'NewJeans')
                },
                { 
                  artist: 'BLACKPINK', 
                  tour: 'Born Pink World Tour',
                  date: '2025.04.20',
                  status: 'upcoming',
                  related: cartItems.some(item => item.artist === 'BLACKPINK')
                },
                { 
                  artist: 'BTS', 
                  tour: 'Yet To Come',
                  date: '2025.05.10',
                  status: 'announced',
                  related: cartItems.some(item => item.artist === 'BTS')
                }
              ].filter(show => show.related).map((show, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-light text-gray-900">{show.artist}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      show.status === 'lottery' ? 'bg-orange-100 text-orange-800' :
                      show.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {show.status === 'lottery' ? '抽選中' :
                       show.status === 'upcoming' ? '即將開放' : '即將公布'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{show.tour}</p>
                  <p className="text-sm text-gray-500 mb-4">{show.date}</p>
                  
                  <Link href={`/tickets/${index + 1}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 rounded-full font-light transition-colors ${
                        show.status === 'lottery' 
                          ? 'bg-orange-500 text-white hover:bg-orange-600'
                          : 'border border-gray-300 text-gray-600 hover:border-gray-400'
                      }`}
                    >
                      {show.status === 'lottery' ? '立即登記' : '查看詳情'}
                    </motion.button>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* More Products */}
            <h3 className="text-xl font-light text-gray-900 mb-6 text-center">更多商品</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { id: 1, name: 'NewJeans 限定帽子', price: 1250, artist: 'NewJeans' },
                { id: 2, name: 'BLACKPINK 寫真集', price: 890, artist: 'BLACKPINK' },
                { id: 3, name: 'BTS 貼紙組', price: 380, artist: 'BTS' },
                { id: 4, name: 'TWICE 周邊包', price: 1980, artist: 'TWICE' }
              ].map((product, index) => (
                <Link href={`/merchandise/${product.id}`} key={product.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl overflow-hidden cursor-pointer group hover:shadow-sm transition-all"
                  >
                    <div className="bg-gradient-to-br from-gray-300 to-gray-400 aspect-square flex items-center justify-center">
                      <div className="text-2xl text-white/50">商品</div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-light text-gray-900 mb-1 text-sm sm:text-base">{product.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 mb-2">{product.artist}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm sm:text-base font-light text-gray-900">NT$ {product.price.toLocaleString()}</p>
                        {isLoggedIn && (
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                            會員價
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
