'use client';

import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { ReactElement } from 'react';

function RegisterForm(): ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: 基本註冊, 2: 完善資料提示
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
    // 清除錯誤訊息
    setError(null);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 驗證電子郵件格式
    if (!validateEmail(formData.email)) {
      alert('請輸入有效的電子郵件地址');
      return;
    }

    // 驗證密碼是否相符
    if (formData.password !== formData.confirmPassword) {
      alert('密碼和確認密碼不相符');
      return;
    }

    setIsLoading(true);
    
    try {
      const registerData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      
      // 觸發登入狀態變化事件
      window.dispatchEvent(new Event('authStateChanged'));
      
      // 註冊成功，進入下一步
      setStep(2);
    } catch (error: Error | unknown) {
      console.error('Registration failed:', error);
      // 設置錯誤訊息
      if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
        setError(String(error.response.data.message));
      } else {
        setError('註冊失敗，請稍後再試');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteProfile = () => {
    if (redirectTo) {
      // 導向個人資料完善頁面，然後返回原頁面
      router.push(`/member/profile?complete=true&redirect=${encodeURIComponent(redirectTo)}`);
    } else {
      router.push('/member/profile?complete=true');
    }
  };

  // 註冊成功後的完善資料提示頁面
  if (step === 2) {
    return (
      <div className="min-h-screen bg-white -mt-20">
        <section className="pt-32 pb-20 px-8">
          <div className="max-w-md mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto"
              >
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl font-light text-gray-900">
                  註冊成功！
                </h1>
                <p className="text-lg text-gray-600 font-light">
                  歡迎加入我們的音樂社群
                </p>
              </div>

              {/* Next Steps */}
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 text-left">
                <h3 className="text-lg font-light text-orange-900 mb-4">完善個人資料</h3>
                <p className="text-sm text-orange-800 mb-4">
                  為了參與抽選登記，請完善您的個人資料：
                </p>
                <ul className="text-xs text-orange-700 space-y-1 mb-6">
                  <li>• 手機號碼（接收中選通知）</li>
                  <li>• 生日資訊（年齡驗證）</li>
                  <li>• 身分證字號（入場驗證）</li>
                  <li>• 通知偏好設定</li>
                </ul>
                
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCompleteProfile}
                    className="w-full py-3 bg-orange-500 text-white rounded-full font-light hover:bg-orange-600 transition-colors"
                  >
                    立即完善資料
                  </motion.button>
                  
                  <Link href={redirectTo || '/member'}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
                    >
                      稍後再說
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

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
                註冊
              </h1>
              <p className="text-gray-600 font-light">
                {redirectTo ? '註冊帳號以參與抽選登記' : '開始您的音樂之旅'}
              </p>
              
              {redirectTo && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-800">
                    註冊後需完善個人資料才能進行抽選登記
                  </p>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
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

              <div>
                <label className="block text-sm text-gray-600 mb-2">確認密碼</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
                  placeholder="請再次輸入密碼"
                />
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  required
                  className="mt-1 rounded"
                />
                <label className="text-sm text-gray-600 leading-relaxed">
                  我同意{' '}
                  <Link href="/terms" className="text-gray-900 hover:underline">
                    服務條款
                  </Link>
                  {' '}和{' '}
                  <Link href="/privacy" className="text-gray-900 hover:underline">
                    隱私政策
                  </Link>
                </label>
              </div>

              <motion.button
                whileHover={{ scale: isLoading || !formData.agreeToTerms ? 1 : 1.02 }}
                whileTap={{ scale: isLoading || !formData.agreeToTerms ? 1 : 0.98 }}
                type="submit"
                disabled={!formData.agreeToTerms || isLoading}
                className={`w-full py-3 rounded-full font-light transition-colors ${
                  !formData.agreeToTerms || isLoading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    註冊中...
                  </div>
                ) : (
                  '註冊'
                )}
              </motion.button>
            </form>

            {/* Social Register */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">或使用</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-sm font-light">Google</span>
                </motion.button>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600">
              已經有帳號？{' '}
              <Link 
                href={`/auth/login${redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`} 
                className="text-gray-900 hover:underline"
              >
                立即登入
              </Link>
            </div>

            {/* Registration Benefits */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">註冊即享權益</h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• 參與所有演出的抽選登記</li>
                <li>• 優先獲得演出開賣通知</li>
                <li>• 個人化演出推薦</li>
                <li>• 會員專屬商品折扣</li>
                <li>• 累積會員點數</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default function Register() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white -mt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
