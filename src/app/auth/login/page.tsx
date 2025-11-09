'use client';

import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import UserInfoModal from './userModal';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect');
  const [open, setOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserInfoSubmit = (data: any) => {
    const { name, phone, idNumber, birthday } = data; // 這裡四個變數都可直接取用
    try {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", "test0000-00000001");
      localStorage.setItem("userId", JSON.stringify("test0000-00000001"));
      localStorage.setItem("userData", JSON.stringify({
        "id": "test0000-00000001",
        "email": "test01@fanlights.fans",
        "name": name,
        "phoneNumber": phone,
        "birthday": birthday,
        "gender": "prefer-not-to-say",
        "idNumber": idNumber,
        "address": "100臺北市中正區延平南路143號",
        "emergencyName": "李先生",
        "emergencyPhone": "0987654321",
        "profileComplete": 1,
        "loginTime": new Date()
      }));
      localStorage.setItem("hasInfo", "true");  

      window.dispatchEvent(new Event('authStateChanged'));
      
      // 登入成功後重定向
      if (redirectTo) {
        router.push(decodeURIComponent(redirectTo));
      } else {
        router.push('/member');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setOpen(true);
    
  };

  return (
    <div className="min-h-screen bg-white -mt-20">
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                登入
              </h1>
              <p className="text-gray-600 font-light">
                {redirectTo ? '請登入以繼續抽選登記' : '歡迎回來，開始您的音樂之旅'}
              </p>
              
              {redirectTo && (
                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-xl">
                  <p className="text-sm text-orange-800">
                    登入後將返回抽選登記頁面
                  </p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                <label className="block text-sm text-gray-600 mb-2">密碼</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                  placeholder="請輸入密碼"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded mr-2" />
                  <span className="text-gray-600">記住我</span>
                </label>
                <Link href="/auth/forgot-password" className="text-gray-600 hover:text-gray-900 transition-colors">
                  忘記密碼？
                </Link>
              </div>

              <motion.button
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-full font-light transition-colors ${
                  isLoading 
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    登入中...
                  </div>
                ) : (
                  '登入'
                )}
              </motion.button>
            </form>

            <div className="text-center text-sm text-gray-600">
              還沒有帳號？{' '}
              <Link 
                href={`/auth/register${redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`} 
                className="text-gray-900 hover:underline"
              >
                立即註冊
              </Link>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">會員專屬權益</h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• 參與演出抽選登記</li>
                <li>• 優先獲得演出資訊</li>
                <li>• 專屬會員折扣</li>
                <li>• 個人化推薦</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
      <UserInfoModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleUserInfoSubmit}
      />
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white -mt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
