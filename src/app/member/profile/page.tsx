'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function ProfileForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isCompleting = searchParams.get('complete') === 'true';
  const redirectTo = searchParams.get('redirect');

  const getLocalData = (key:string, defaultValue = "") => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  };
  
  const [formData, setFormData] = useState(() => getLocalData("userData"));
  type formdata = {
    name: string;
    email: string;
    phone: string;
    birthday: string;
    gender: string;
    address: string;
    emergencyContact: string;
    emergencyPhone: string;
    idNumber: string;
    preferences: {
      notifications: boolean,
      sms: boolean,
      newsletter: boolean
    }
  }

  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // 檢查必填欄位是否完整
    const requiredFields = ['name', 'email', 'phoneNumber', 'birthday', 'idNumber'];
    const isFormComplete = requiredFields.every(field => 
      formData[field as keyof typeof formData] && 
      (formData[field as keyof typeof formData] as string).trim() !== ''
    );
    setIsComplete(isFormComplete);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (name.startsWith('preferences.')) {
      const prefKey = name.split('.')[1];
      setFormData((prev:formdata) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefKey]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }
      }));
    } else {
      setFormData((prev:formdata) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComplete) {
      try {
          
          let userInfo = JSON.parse(localStorage.getItem("userData") || "{}");
          userInfo.name = formData.name;
          userInfo.phoneNumber = formData.phoneNumber;
          userInfo.birthday = formData.birthday;
          userInfo.idNumber = formData.idNumber;
          localStorage.setItem("userData", JSON.stringify(userInfo));
          // 觸發狀態變化事件
          window.dispatchEvent(new Event('authStateChanged'));
        // }
        
        if (redirectTo) {
          // 如果有重定向參數，導向指定頁面
          router.push(decodeURIComponent(redirectTo));
        } else if (isCompleting) {
          // 如果是從購票頁面來的，返回購票頁面
          router.back();
        } else {
          // 顯示成功訊息或導向會員中心
          router.push('/member');
        }
      } catch (error) {
        console.error('Error saving profile:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white -mt-20">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-4">
                {isCompleting ? '完善個人資料' : '個人資料'}
              </h1>
              <p className="text-lg text-gray-600 font-light">
                {isCompleting 
                  ? '請完整填寫個人資料以進行抽選登記' 
                  : '管理您的個人資訊與偏好設定'
                }
              </p>
              
              {isCompleting && (
                <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="text-sm text-orange-800">
                    完善個人資料是進行抽選登記的必要條件
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 基本資料 */}
              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
                <h3 className="text-lg font-light text-gray-900 mb-6">基本資料</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      姓名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                      placeholder="請輸入真實姓名"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      電子郵件 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                      placeholder="your@email.com"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      手機號碼 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber??""}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                      placeholder="09xxxxxxxx"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      生日 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="birthday"
                      value={formData.birthday??""}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">性別</label>
                    <select
                      name="gender"
                      value={formData.gender??""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                      disabled
                    >
                      <option value="">請選擇</option>
                      <option value="male">男</option>
                      <option value="female">女</option>
                      <option value="other">其他</option>
                      <option value="prefer-not-to-say">不願透露</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      身分證字號 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="idNumber"
                      onChange={handleInputChange}
                      value={formData.idNumber??""}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                      placeholder="A123456789"
                      maxLength={10}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm text-gray-600 mb-2">地址</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                    placeholder="完整地址（選填）"
                    disabled
                  />
                </div>
              </div>

              {/* 緊急聯絡人 */}
              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
                <h3 className="text-lg font-light text-gray-900 mb-6">緊急聯絡人</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">聯絡人姓名</label>
                    <input
                      type="text"
                      name="emergencyName"
                      value={formData.emergencyName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                      placeholder="緊急聯絡人（選填）"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">聯絡人電話</label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                      placeholder="緊急聯絡電話（選填）"
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* 通知偏好 */}
              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
                <h3 className="text-lg font-light text-gray-900 mb-6">通知偏好</h3>
                
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="preferences.notifications"
                      checked={formData.preferences?.notifications}
                      onChange={handleInputChange}
                      className="rounded mr-3"
                      disabled
                    />
                    <span className="text-gray-700">接收演出通知</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="preferences.sms"
                      checked={formData.preferences?.sms}
                      onChange={handleInputChange}
                      className="rounded mr-3"
                      disabled
                    />
                    <span className="text-gray-700">接收簡訊通知</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="preferences.newsletter"
                      checked={formData.preferences?.newsletter}
                      onChange={handleInputChange}
                      className="rounded mr-3"
                      disabled
                    />
                    <span className="text-gray-700">接收電子報</span>
                  </label>
                </div>
              </div>

              {/* 完整度指示器 */}
              {isCompleting && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">資料完整度</span>
                    <span className={`text-sm font-medium ${
                      isComplete ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {isComplete ? '完整' : '待完善'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isComplete ? 'bg-green-500 w-full' : 'bg-orange-500 w-3/4'
                      }`}
                    />
                  </div>
                  {!isComplete && (
                    <p className="text-xs text-gray-500 mt-2">
                      請完整填寫標有 * 的必填欄位
                    </p>
                  )}
                </div>
              )}

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isCompleting && !isComplete}
                  className={`flex-1 py-4 rounded-full font-light text-lg transition-colors ${
                    isCompleting && !isComplete
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {isCompleting ? '完成並返回' : '儲存變更'}
                </motion.button>
                
                <Link href={'/member'}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="px-8 py-4 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
                  >
                    取消
                  </motion.button>
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default function Profile() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white -mt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">載入個人資料中...</p>
        </div>
      </div>
    }>
      <ProfileForm />
    </Suspense>
  );
}
