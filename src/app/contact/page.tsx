'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-white -mt-20">
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-16"
          >
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-4">
                聯絡我們
              </h1>
              <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
                有任何問題或建議，我們很樂意為您服務
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-light text-gray-900 mb-8">發送訊息</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">姓名</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                      placeholder="請輸入您的姓名"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">電子郵件</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">主旨</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                    >
                      <option value="">請選擇主旨</option>
                      <option value="lottery">抽選登記問題</option>
                      <option value="payment">付費相關</option>
                      <option value="ticket">票券相關</option>
                      <option value="merchandise">商品相關</option>
                      <option value="account">帳戶問題</option>
                      <option value="technical">技術問題</option>
                      <option value="other">其他</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">訊息內容</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors resize-none"
                      placeholder="請詳細描述您的問題或建議..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 bg-gray-900 text-white rounded-full font-light text-lg hover:bg-gray-800 transition-colors"
                  >
                    發送訊息
                  </motion.button>
                </form>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-light text-gray-900 mb-8">聯絡資訊</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-light text-gray-900 mb-4">聯絡方式</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        {/* <span className="text-sm px-3 py-2 bg-gray-100 rounded">郵件</span> */}
                        <div>
                          <p className="text-gray-900">電子郵件</p>
                          <p className="text-gray-600">hello@superlaty.com</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-light text-gray-900 mb-4">常見問題</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-medium text-gray-900 mb-2">如何進行抽選登記？</h4>
                        <p className="text-sm text-gray-600">
                          請先登入並完善個人資料，然後在演出頁面選擇區域和數量進行登記。
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-medium text-gray-900 mb-2">忘記密碼怎麼辦？</h4>
                        <p className="text-sm text-gray-600">
                          請至登入頁面點選「忘記密碼」，系統將發送重設連結至您的信箱。
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-medium text-gray-900 mb-2">中選後如何付費？</h4>
                        <p className="text-sm text-gray-600">
                          中選通知會包含付費連結，請在期限內完成付款以確保票券。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
