"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";





export default function MemberCenter() {
  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState({
    name: "用戶",
    email: "",
    phoneNumber: "",
    idNumber: "",
    memberLevel: "一般會員",
    points: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  // 從 localStorage 讀取用戶資料
  useEffect(() => {
    const loadUserData = () => {
      try {
        const loginStatus = localStorage.getItem('isLoggedIn');
        const userDataStr = localStorage.getItem('userData');

        
        if (loginStatus === 'true' && userDataStr) {
          const user = JSON.parse(userDataStr);
          setUserData({
            name: user.name || "用戶",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            idNumber: user.idNumber || "",
            memberLevel: user.memberLevel || "一般會員",
            points: user.points || 0,
          });
          

        } else {
          // 未登入，重定向到登入頁面
          window.location.href = '/auth/login?redirect=' + encodeURIComponent('/member');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();

    // 監聽登入狀態變化
    const handleAuthChange = () => {
      loadUserData();
    };

    window.addEventListener('authStateChanged', handleAuthChange);

    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white -mt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  const recentActivity = [
    {
      id: 1,
      type: "ticket",
      title: "NewJeans 演唱會",
      date: "2025.03.01",
      status: "已確認",
    },
    {
      id: 2,
      type: "merchandise",
      title: "BLACKPINK 周邊包",
      date: "2025.02.25",
      status: "已出貨",
    },
    {
      id: 3,
      type: "ticket",
      title: "BTS 演唱會",
      date: "2025.02.10",
      status: "已完成",
    },
  ];



  const tabs = [
    { id: "overview", name: "概覽" },
    { id: "profile", name: "個人資料" },
    // { id: "preferences", name: "偏好設定" },
    { id: "orders", name: "訂單記錄" },
    { id: "downloads", name: "下載管理" },
  ];

  return (
    <div className="min-h-screen bg-white -mt-20">
      {/* Hero Section - Max Braun style */}
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
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-2">
                  個人設定
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 font-light">
                  管理您的帳戶和偏好設定
                </p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-xl sm:text-2xl font-light text-gray-900">
                  {userData.memberLevel}
                </div>
                <div className="text-sm text-gray-500">
                  {userData.points.toLocaleString()} 點數
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 sm:space-x-8 border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 font-light transition-colors whitespace-nowrap text-sm sm:text-base ${
                  activeTab === tab.id
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8 sm:space-y-12"
            >
              {/* Quick Access */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl font-light text-blue-900 mb-6">快速入口</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link href="/my-tickets">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white rounded-xl p-4 text-center hover:shadow-sm transition-all"
                    >
                      <div className="text-3xl mb-2 text-purple-600">票券</div>
                      <h3 className="font-light text-gray-900 mb-1">我的票券</h3>
                      <p className="text-xs text-gray-600">查看和管理票券</p>
                    </motion.div>
                  </Link>
                  
                  <Link href="/tickets">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white rounded-xl p-4 text-center hover:shadow-sm transition-all"
                    >
                      <div className="text-3xl mb-2 text-orange-600">演出</div>
                      <h3 className="font-light text-gray-900 mb-1">瀏覽演出</h3>
                      <p className="text-xs text-gray-600">發現新的演出</p>
                    </motion.div>
                  </Link>
                  
                  <Link href="/cart">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white rounded-xl p-4 text-center hover:shadow-sm transition-all"
                    >
                      <div className="text-3xl mb-2 text-green-600">購物</div>
                      <h3 className="font-light text-gray-900 mb-1">購物車</h3>
                      <p className="text-xs text-gray-600">完成結帳付費</p>
                    </motion.div>
                  </Link>
                </div>
              </div>

              {/* Account Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
                <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-light text-gray-900 mb-2">
                    {userData.memberLevel}
                  </div>
                  <div className="text-sm text-gray-600">會員等級</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-light text-gray-900 mb-2">
                    {userData.points.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">會員點數</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-light text-gray-900 mb-2">
                    365
                  </div>
                  <div className="text-sm text-gray-600">會員天數</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h2 className="text-2xl font-light text-gray-900 mb-8">
                  最近活動
                </h2>
                <div className="space-y-6">
                  {recentActivity.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-6 border-b border-gray-100 last:border-b-0"
                    >
                      <div>
                        <h3 className="text-lg font-light text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">{item.date}</p>
                      </div>
                      <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <h2 className="text-2xl font-light text-gray-900">個人資料</h2>

              {/* Profile Overview */}
              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
                <h3 className="text-lg font-light text-gray-900 mb-6">基本資料</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <span className="text-sm text-gray-500">姓名</span>
                    <p className="font-medium text-gray-900 mt-1">{userData.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">電子郵件</span>
                    <p className="font-medium text-gray-900 mt-1">{userData.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">會員等級</span>
                    <p className="font-medium text-gray-900 mt-1">{userData.memberLevel}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">會員點數</span>
                    <p className="font-medium text-gray-900 mt-1">{userData.points.toLocaleString()} 點</p>
                  </div>
                </div>
              </div>

              {/* Edit Profile Form */}
              <div className="space-y-8">
                <h3 className="text-lg font-light text-gray-900">
                  編輯個人資訊
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      姓名
                    </label>
                    <input
                      type="text"
                      defaultValue={userData.name}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      電子郵件
                    </label>
                    <input
                      type="email"
                      defaultValue={userData.email}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      手機號碼
                    </label>
                    <input
                      type="tel"
                      defaultValue={userData.phoneNumber}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      身份證字號
                    </label>
                    <input
                      type="text"
                      defaultValue={userData.idNumber}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Account Actions */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-light text-gray-900 mb-4">
                  帳戶操作
                </h3>
                
                <div className="flex gap-4">
                  <Link href="/member/profile?complete=true">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto px-6 py-3 border border-blue-300 text-blue-600 rounded-full font-light hover:border-blue-400 transition-colors"
                    >
                      完善個人資料
                    </motion.button>
                  </Link>
                  
                  <Link href="/lottery/history">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
                    >
                      查看抽選歷史
                    </motion.button>
                  </Link>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-gray-900 text-white rounded-full font-light hover:bg-gray-800 transition-colors"
                >
                  儲存變更
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
                >
                  取消
                </motion.button>
              </div>

              {/* Logout Section */}
              <div className="border-t border-gray-200 pt-8">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                  <h3 className="text-lg font-light text-red-900 mb-4">
                    登出帳戶
                  </h3>
                  <p className="text-sm text-red-800 mb-6">
                    登出後您的抽選登記和購物車將會保留，但需要重新登入才能進行結帳或管理操作。
                  </p>
                  
                  <Link href="/auth/logout">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-red-600 text-white rounded-full font-light hover:bg-red-700 transition-colors"
                    >
                      確認登出
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* Redirect to My Tickets */}
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 sm:p-8 text-center">
                <div className="text-4xl mb-4 text-purple-600">票券</div>
                <h3 className="text-xl font-light text-purple-900 mb-4">
                  票券管理已獨立
                </h3>
                <p className="text-purple-800 mb-6">
                  所有票券相關功能（QR Code、下載、管理）已移至專門的票券頁面
                </p>
                
                <Link href="/my-tickets">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-purple-600 text-white rounded-full font-light text-lg hover:bg-purple-700 transition-colors"
                  >
                    前往我的票券
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}

          {activeTab === "orders" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-light text-gray-900">訂單記錄</h2>
              <div className="space-y-6">
                {recentActivity.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-6 border-b border-gray-100 last:border-b-0"
                  >
                    <div>
                      <h3 className="text-lg font-light text-gray-900">
                        {order.title}
                      </h3>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {order.status}
                      </span>
                      <Link href={`/orders/TK2025030${order.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          查看詳情
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "reminders" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-light text-gray-900">我的提醒</h2>
              
              <div className="space-y-6">
                {[
                  {
                    id: 1,
                    artist: 'TWICE',
                    tour: '5TH WORLD TOUR',
                    saleDate: '2025.04.01',
                    saleTime: '10:00',
                    reminderTime: '開賣前24小時',
                    method: '電子郵件',
                    status: 'active'
                  },
                  {
                    id: 2,
                    artist: '(G)I-DLE',
                    tour: 'World Tour',
                    saleDate: '2025.05.15',
                    saleTime: '10:00',
                    reminderTime: '開賣前1小時',
                    method: '電子郵件 + 簡訊',
                    status: 'active'
                  },
                  {
                    id: 3,
                    artist: 'aespa',
                    tour: 'MY WORLD',
                    saleDate: '2025.03.01',
                    saleTime: '10:00',
                    reminderTime: '開賣前24小時',
                    method: '電子郵件',
                    status: 'completed'
                  }
                ].map((reminder) => (
                  <div key={reminder.id} className="bg-gray-50 rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-light text-gray-900">{reminder.artist}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            reminder.status === 'active' ? 'bg-green-100 text-green-800' :
                            reminder.status === 'completed' ? 'bg-gray-100 text-gray-600' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {reminder.status === 'active' ? '已設定' :
                             reminder.status === 'completed' ? '已完成' : '待確認'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{reminder.tour}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-500">
                          <span>開賣：{reminder.saleDate} {reminder.saleTime}</span>
                          <span>提醒：{reminder.reminderTime}</span>
                          <span>方式：{reminder.method}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        {reminder.status === 'active' && (
                          <>
                            <Link href={`/reminders/${reminder.id}/edit`}>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 border border-gray-300 text-gray-600 rounded-full text-sm font-light hover:border-gray-400 transition-colors"
                              >
                                編輯
                              </motion.button>
                            </Link>
                            <Link href={`/reminders/${reminder.id}/cancel`}>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 text-red-500 hover:text-red-600 transition-colors text-sm font-light"
                              >
                                取消
                              </motion.button>
                            </Link>
                          </>
                        )}
                        {reminder.status === 'completed' && (
                          <span className="text-xs text-gray-400 px-3 py-2">提醒已發送</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl">
                <div className="text-4xl text-gray-300 mb-4">通知</div>
                <h3 className="text-lg font-light text-gray-900 mb-2">設定更多提醒</h3>
                <p className="text-gray-600 font-light mb-6">不錯過任何精彩演出的開賣時間</p>
                <Link href="/tickets">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gray-900 text-white rounded-full font-light hover:bg-gray-800 transition-colors"
                  >
                    瀏覽演出
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
