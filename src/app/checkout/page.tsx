'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'credit-card'
  });

  // 檢查登入狀態並預填資料
  useEffect(() => {
    const checkAuthAndLoadData = () => {
      try {
        const loginStatus = localStorage.getItem('isLoggedIn');
        const userData = localStorage.getItem('userData');
        const userProfile = localStorage.getItem('userProfile');
        
        if (loginStatus === 'true' && userData) {
          const user = JSON.parse(userData);
          
          // 預填用戶資料
          let updatedFormData = {
            ...formData,
            email: user.email || '',
            name: user.name || ''
          };
          
          if (userProfile) {
            const profile = JSON.parse(userProfile);
            updatedFormData = {
              ...updatedFormData,
              phone: profile.phone || '',
              address: profile.address || ''
            };
          }
          
          setFormData(updatedFormData);
        } else {
          // 未登入，重定向到登入頁面
          window.location.href = '/auth/login?redirect=' + encodeURIComponent('/checkout');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    checkAuthAndLoadData();
  }, [formData]);

  // 從 localStorage 載入購物車資料
  const [cartItems, setCartItems] = useState<Array<{
    id: number;
    name: string;
    artist: string;
    price: number;
    quantity: number;
    type: 'ticket' | 'merchandise';
    ticketInfo?: {
      eventDate: string;
      venue: string;
      section: string;
      paymentDeadline?: string;
    };
  }>>([]);

  useEffect(() => {
    // 載入購物車資料
    const loadCartData = () => {
      try {
        const cartData = localStorage.getItem('cartItems');
        if (cartData) {
          setCartItems(JSON.parse(cartData));
        } else {
          // 模擬購物車資料
          setCartItems([
            {
              id: 1,
              name: 'NewJeans 演出票券',
              artist: 'NewJeans',
              price: 3200,
              quantity: 2,
              type: 'ticket',
              ticketInfo: {
                eventDate: '2025.03.15 19:30',
                venue: '台北小巨蛋',
                section: 'A區',
                paymentDeadline: '2025.03.14 23:59'
              }
            },
            {
              id: 2,
              name: 'NewJeans T-Shirt',
              artist: 'NewJeans',
              price: 1280,
              quantity: 1,
              type: 'merchandise'
            }
          ]);
        }
      } catch (error) {
        console.error('Error loading cart data:', error);
      }
    };

    loadCartData();
  }, []);

  // 計算總價
  const ticketItems = cartItems.filter(item => item.type === 'ticket');
  const merchandiseItems = cartItems.filter(item => item.type === 'merchandise');
  
  const ticketSubtotal = ticketItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const merchandiseSubtotal = merchandiseItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const ticketFees = ticketItems.length > 0 ? 150 * ticketItems.length : 0;
  const shipping = merchandiseItems.length > 0 && merchandiseSubtotal < 1500 ? 150 : 0;
  const total = ticketSubtotal + ticketFees + merchandiseSubtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
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
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-6 sm:mb-8">結帳</h1>
            
            {/* Progress Steps */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 lg:space-x-8 mb-8 sm:mb-12 space-y-4 sm:space-y-0">
              {[
                { number: 1, title: '確認訂單' },
                { number: 2, title: '填寫資料' },
                { number: 3, title: '付款' }
              ].map((stepItem) => (
                <div key={stepItem.number} className="flex items-center justify-center sm:justify-start">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                    step >= stepItem.number
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {stepItem.number}
                  </div>
                  <span className={`ml-2 sm:ml-3 text-xs sm:text-sm ${
                    step >= stepItem.number ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {stepItem.title}
                  </span>
                  {stepItem.number < 3 && (
                    <div className="hidden sm:block w-8 lg:w-12 h-px bg-gray-200 ml-4 lg:ml-8"></div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-light text-gray-900">確認訂單</h2>
                  
                  <div className="space-y-6">
                    {/* Tickets */}
                    {ticketItems.length > 0 && (
                      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                        <h3 className="text-lg font-light text-orange-900 mb-4">演出票券</h3>
                        <div className="space-y-4">
                          {ticketItems.map(item => (
                            <div key={item.id} className="bg-white rounded-xl p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-gray-900">{item.name}</h4>
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                  中選
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">演出時間</span>
                                  <p className="text-gray-900 mt-1">{item.ticketInfo?.eventDate}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">場地</span>
                                  <p className="text-gray-900 mt-1">{item.ticketInfo?.venue}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">座位</span>
                                  <p className="text-gray-900 mt-1">{item.ticketInfo?.section}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">數量</span>
                                  <p className="text-gray-900 mt-1">{item.quantity} 張</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Merchandise */}
                    {merchandiseItems.length > 0 && (
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-lg font-light text-gray-900 mb-4">商品</h3>
                        <div className="space-y-3">
                          {merchandiseItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium text-gray-900">{item.name}</h4>
                                <p className="text-sm text-gray-600">{item.artist}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">NT$ {item.price.toLocaleString()}</p>
                                <p className="text-sm text-gray-600">× {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-light text-gray-900">填寫資料</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">電子郵件</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">姓名</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                        placeholder="請輸入您的姓名"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">手機號碼</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                        placeholder="09XX-XXX-XXX"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-light text-gray-900">付款方式</h2>
                  
                  <div className="space-y-4">
                    {[
                      { id: 'credit-card', name: '信用卡', icon: '💳' },
                      { id: 'line-pay', name: 'LINE Pay', icon: '📱' },
                      { id: 'apple-pay', name: 'Apple Pay', icon: '🍎' }
                    ].map((method) => (
                      <motion.label
                        key={method.id}
                        whileHover={{ scale: 1.01 }}
                        className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                          formData.paymentMethod === method.id
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        {/* <span className="text-2xl mr-4">{method.icon}</span> */}
                        <span className="font-light">{method.name}</span>
                        {formData.paymentMethod === method.id && (
                          <span className="ml-auto text-gray-900">✓</span>
                        )}
                      </motion.label>
                    ))}
                  </div>

                  {formData.paymentMethod === 'credit-card' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
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
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 h-fit order-1 lg:order-2">
              <h3 className="text-lg sm:text-xl font-light text-gray-900 mb-4 sm:mb-6">結帳摘要</h3>
              
              <div className="space-y-4 mb-6">
                {/* Tickets */}
                {ticketSubtotal > 0 && (
                  <>
                    <div className="border-b border-gray-200 pb-3">
                      <h4 className="font-medium text-gray-900 mb-2">演出票券</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">票券費用</span>
                          <span>NT$ {ticketSubtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">手續費</span>
                          <span>NT$ {ticketFees.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {/* Merchandise */}
                {merchandiseSubtotal > 0 && (
                  <>
                    <div className={`${ticketSubtotal > 0 ? 'border-b border-gray-200 pb-3' : ''}`}>
                      <h4 className="font-medium text-gray-900 mb-2">商品</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">商品費用</span>
                          <span>NT$ {merchandiseSubtotal.toLocaleString()}</span>
                        </div>
                        {shipping > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">運費</span>
                            <span>NT$ {shipping.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
                
                <div className="flex justify-between text-lg font-light border-t border-gray-200 pt-4">
                  <span>總計</span>
                  <span>NT$ {total.toLocaleString()}</span>
                </div>
                
                {/* Urgent Payment Notice */}
                {ticketItems.some(item => item.ticketInfo?.paymentDeadline) && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                    <div className="text-xs text-red-800 text-center">
                      包含限時付費票券，請盡快完成結帳
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 flex flex-col">
                {step > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBack}
                    className="w-full py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
                  >
                    上一步
                  </motion.button>
                )}
                
                {step < 3 ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className="w-full py-3 bg-gray-900 text-white rounded-full font-light hover:bg-gray-800 transition-colors"
                  >
                    下一步
                  </motion.button>
                ) : (
                  <Link href="/checkout/success">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gray-900 text-white rounded-full font-light hover:bg-gray-800 transition-colors"
                    >
                      完成付款
                    </motion.button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
