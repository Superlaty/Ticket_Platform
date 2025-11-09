'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import LogoutConfirmModal from './LogoutConfirmModal';
import Image from 'next/image';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{name: string; email: string} | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();

  // 從 localStorage 讀取登入狀態
  useEffect(() => {
    const checkLoginStatus = () => {
      try {
        const loginStatus = localStorage.getItem('isLoggedIn');
        const userData = localStorage.getItem('userData');
        
        if (loginStatus === 'true' && userData) {
          setIsLoggedIn(true);
          setUserInfo(JSON.parse(userData));
        } else {
          setIsLoggedIn(false);
          setUserInfo(null);
        }
      } catch (error) {
        console.error('Error reading login status:', error);
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    };

    checkLoginStatus();

    // 監聽 storage 變化（多分頁同步）
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'isLoggedIn' || e.key === 'userData') {
        checkLoginStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // 自定義事件監聽（同一分頁內的登入狀態變化）
    const handleAuthChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('authStateChanged', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authStateChanged', handleAuthChange);
    };
  }, []);

  // 登出功能
  const handleLogout = () => {
    try {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userData');
      localStorage.removeItem('userProfile');
      setIsLoggedIn(false);
      setUserInfo(null);
      setIsMenuOpen(false);
      
      // 觸發自定義事件
      window.dispatchEvent(new Event('authStateChanged'));
      
      // 重定向到登出成功頁面
      window.location.href = '/auth/logout';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const navItems = [
    { href: '/', label: '首頁' },
    { href: '/tickets', label: '演出' },
    { href: '/merchandise', label: '商城' },
    { href: '/my-tickets', label: '我的票券' }
  ];

  const [cartItemCount, setCartItemCount] = useState(0);
  // const [savedItemCount, setSavedItemCount] = useState(0);

  // 更新購物車和已儲存商品數量
  useEffect(() => {
    const updateCounts = () => {
      try {
          setCartItemCount(1);
      } catch (error) {
        console.error('Error updating counts:', error);
      }
    };

    updateCounts();

    // 監聽購物車變化
    const handleCartChange = () => {
      updateCounts();
    };

    window.addEventListener('cartUpdated', handleCartChange);
    window.addEventListener('authStateChanged', updateCounts);

    return () => {
      window.removeEventListener('cartUpdated', handleCartChange);
      window.removeEventListener('authStateChanged', updateCounts);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };
  const isTarget = pathname === '/verify';
  return (
    <>
      {/* Navigation - Max Braun minimalist style */}
      {!isTarget && <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md"
      >
        <div className="h-16 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
          {/* Logo */}
          <motion.div
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="text-2xl font-light tracking-wide text-gray-900 flex-shrink-0">
              {/* FanLights */}
              <Image 
                src="/logo2.png" 
                className="-mt-2 scale-50 sm:scale-75 xl:scale-100" 
                alt="Superlaty Logo" 
                width={120} 
                height={50} 
                priority
              />
            </Link>
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navItems.slice(1).map((item) => {
              // 修正「我的票券」無法跳轉：用 button, disabled on certain conditions
              if (item.label === '我的票券') {
                return (
                  <button
                    key={item.href}
                    onClick={() => {
                      // 若 href 存在，則跳轉
                      const userId = localStorage.getItem('userId');
                      if (item.href && userId) {
                        window.location.href = item.href;
                      }
                      else
                      {alert("請完成登入");}
                    }}
                    className={`transition-colors duration-200 text-sm lg:text-base whitespace-nowrap bg-transparent outline-none border-none cursor-pointer ${
                      isActive(item.href)
                        ? 'text-black font-normal'
                        : 'text-gray-500 hover:text-black'
                    }`}
                    type="button"
                  >
                    {item.label}
                  </button>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors duration-200 text-sm lg:text-base whitespace-nowrap ${
                    isActive(item.href)
                      ? 'text-black font-normal'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 flex-shrink-0">
            <Link 
              href="/verify"
              className={`transition-colors duration-200 text-sm lg:text-base whitespace-nowrap text-black font-normal`}
            >
              前往驗證端
            </Link>
            {/* Cart Icon */}
            {isLoggedIn && (
              <Link href="/cart">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h12.5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {cartItemCount > 9 ? '9+' : cartItemCount}
                    </span>
                  )}
                </motion.div>
              </Link>
            )}

            {/* Saved Items Icon */}
            {/* <Link href="/cart/saved">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                {savedItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                    {savedItemCount > 9 ? '9+' : savedItemCount}
                  </span>
                )}
              </motion.div>
            </Link> */}

            {!isLoggedIn ? (
              <>
                <Link href="/auth/login">
                  <motion.button
                    whileHover={{ opacity: 0.7 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-gray-500 hover:text-gray-900 transition-colors font-light text-sm lg:text-base"
                  >
                    登入
                  </motion.button>
                </Link>
                <Link href="/auth/register">
                  <motion.button
                    whileHover={{ scale: 1.02, opacity: 0.9 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-3 lg:px-4 py-2 bg-gray-900 text-white rounded-full font-light hover:bg-gray-800 transition-all duration-200 text-xs lg:text-sm whitespace-nowrap"
                  >
                    開始抽選
                  </motion.button>
                </Link>
              </>
            ) : (
              <>
                {/* Notification Icon for logged in users */}
                <Link href="/wishlist">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                    title="查看收藏"
                  >
                    <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
                  </motion.div>
                </Link>

                {/* User Menu */}
                <div className="relative flex items-center space-x-1 lg:space-x-2">
                  <Link href="/member">
                    <motion.div
                      whileHover={{ scale: 1.02, opacity: 0.9 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-2 bg-gray-900 text-white rounded-full font-light hover:bg-gray-800 transition-all duration-200 text-xs lg:text-sm"
                    >
                      <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-white">
                          {userInfo?.name?.charAt(0) || '用'}
                        </span>
                      </div>
                      <span className="hidden lg:inline whitespace-nowrap">
                        設定
                      </span>
                    </motion.div>
                  </Link>
                  
                  {/* Logout Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowLogoutModal(true)}
                    className="p-1.5 lg:p-2 text-gray-500 hover:text-red-500 transition-colors flex-shrink-0"
                    title="登出"
                  >
                    <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </motion.button>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ opacity: 0.7 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-500 hover:text-gray-900 transition-colors flex-shrink-0"
          >
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <motion.div
                animate={{ 
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 6 : 0
                }}
                className="w-full h-px bg-current"
              />
              <motion.div
                animate={{ 
                  opacity: isMenuOpen ? 0 : 1
                }}
                className="w-full h-px bg-current"
              />
              <motion.div
                animate={{ 
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -6 : 0
                }}
                className="w-full h-px bg-current"
              />
            </div>
          </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-gray-100 absolute top-full left-0 right-0 max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4">
                {navItems.map((item) => {
                  if (item.label === '我的票券') {
                    return (
                      <button
                        key={item.href}
                        onClick={() => {
                          const userId = localStorage.getItem('userId');
                          if (item.href && userId) {
                            window.location.href = item.href;
                            setIsMenuOpen(false);
                          } else {
                            alert("請完成登入");
                          }
                        }}
                        className={`block text-base transition-colors py-2 bg-transparent outline-none border-none cursor-pointer w-full text-left ${
                          isActive(item.href)
                            ? 'text-black font-medium'
                            : 'text-gray-600 hover:text-black font-light'
                        }`}
                        type="button"
                      >
                        {item.label}
                      </button>
                    );
                  }
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block text-base transition-colors py-2 ${
                        isActive(item.href)
                          ? 'text-black font-medium'
                          : 'text-gray-600 hover:text-black font-light'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                
                {/* Mobile Cart & Saved Items */}
                {isLoggedIn && (
                  <div className="flex space-x-2 py-3 border-t border-gray-100">
                    <Link href="/cart" className="flex-1">
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center p-3 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h12.5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                        <span className="text-sm text-gray-600">購物車</span>
                        {cartItemCount > 0 && (
                          <span className="ml-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {cartItemCount > 9 ? '9+' : cartItemCount}
                          </span>
                        )}
                      </motion.div>
                    </Link>
                  
                    <Link href="/wishlist" className="flex-1">
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center p-3 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-sm text-gray-600">收藏</span>
                      </motion.div>
                    </Link>
                  </div>
                )}
                
                <div className="border-t border-gray-100 pt-4 space-y-3">
                  {!isLoggedIn ? (
                    <>
                      <Link href="/auth/login">
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setIsMenuOpen(false)}
                          className="w-full text-left text-gray-600 hover:text-gray-900 transition-colors font-light text-base py-2"
                        >
                          登入
                        </motion.button>
                      </Link>
                      <Link href="/auth/register">
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setIsMenuOpen(false)}
                          className="w-full px-6 py-3 bg-gray-900 text-white rounded-full font-light hover:bg-gray-800 transition-colors text-center text-base"
                        >
                          開始抽選
                        </motion.button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/member">
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setIsMenuOpen(false)}
                          className="w-full text-left text-gray-600 hover:text-gray-900 transition-colors font-light text-base py-2"
                        >
                          會員中心
                        </motion.button>
                      </Link>
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setShowLogoutModal(true);
                        }}
                        className="w-full text-left text-red-500 hover:text-red-600 transition-colors font-light text-base py-2"
                      >
                        登出
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>}

      {isTarget && <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md"
      >
        <div className="h-16 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
          {/* Logo */}
            <motion.div
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/verify" className="text-2xl font-light tracking-wide text-gray-900 flex-shrink-0">
                {/* FanLights */}
                <Image 
                  src="/logo2.png" 
                  className="-mt-2 scale-50 sm:scale-75 xl:scale-100" 
                  alt="Superlaty Logo" 
                  width={120} 
                  height={50} 
                  priority
                />
              </Link>
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <Link 
                href="/"
                className={`transition-colors duration-200 text-sm lg:text-base whitespace-nowrap text-black font-normal`}
              >
                前往會員端
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>}

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16"></div>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        userName={userInfo?.name}
      />
    </>
  );
}
