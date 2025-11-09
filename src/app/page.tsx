'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, HeartIcon, ShoppingCartIcon, ClockIcon, FireIcon, ChatBubbleLeftRightIcon, HashtagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 32, seconds: 45 });

  // Hero Banner 數據
  const banners = [
    {
      id: 1,
      image: '/banner-1.jpg',
      title: 'NewJeans World Tour',
      subtitle: '2025 Get Up 亞洲巡迴演唱會',
      description: '與 NewJeans 一起感受最純真的音樂魅力',
      cta: '立即登記抽選',
      ctaLink: '/tickets/1',
      hasCountdown: true,
      status: 'lottery'
    },
    {
      id: 2,
      image: '/banner-2.jpg',
      title: 'BLACKPINK 限量周邊',
      subtitle: 'Born Pink 官方應援商品',
      description: '獨家設計，數量有限，售完即止',
      cta: '搶購商品',
      ctaLink: '/merchandise',
      hasCountdown: false,
      status: 'sale'
    }
  ];

  // 倒數計時器
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 輪播自動播放
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [banners.length, isHovered]);

  // 控制收藏狀態
  const [favorites, setFavorites] = useState(new Set());
  const [activeTab, setActiveTab] = useState('events'); // events, merchandise

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  // 推薦活動數據
  const featuredEvents = [
    { id: 1, artist: 'NewJeans', title: 'Get Up World Tour', date: '2025.03.15', venue: '台北小巨蛋', status: 'sold-out', price: '3200', image: '/banner-1.jpg', tag: '熱門' },
    { id: 2, artist: 'BLACKPINK', title: 'Born Pink World Tour', date: '2025.04.20', venue: '台北小巨蛋', status: 'announced', price: '2800', image: '/banner-2.jpg', tag: '即將開放' },
    { id: 3, artist: 'BTS', title: 'Yet To Come', date: '2025.05.10', venue: '高雄世運主場館', status: 'announced', price: '4500', image: '/banner-3.jpg', tag: '搶先預告' },
    { id: 4, artist: 'IU', title: 'The Golden Hour', date: '2025.06.05', venue: '台北小巨蛋', status: 'sold-out', price: '3800', image: '/banner-4.jpg', tag: '個人化推薦' },
    { id: 5, artist: 'TWICE', title: 'TWICE <THIS IS FOR> WORLD TOUR', date: '2025.11.22', venue: '高雄國家體育場', status: 'lottery', price: '100', image: '/banner-5.jpg', tag: '最多影響力' }
  
  ];

  // 推薦周邊數據
  const featuredMerchandise = [
    { id: 1, artist: 'NewJeans', name: '官方應援燈', price: '1,200', stock: 45, image: '/banner-1.jpg', tag: '限量' },
    { id: 2, artist: 'BLACKPINK', name: '演唱會T恤', price: '890', stock: 120, image: '/banner-2.jpg', tag: '熱賣' },
    { id: 3, artist: 'BTS', name: '紀念徽章套組', price: '650', stock: 8, image: '/banner-3.jpg', tag: '即將售罄' },
    { id: 4, artist: 'IU', name: '限定海報', price: '450', stock: 200, image: '/banner-4.jpg', tag: '新品' },
    { id: 5, artist: 'TWICE', name: '限定紀念照', price: '100', stock: 200, image: '/banner-5.jpg', tag: '最暢銷' }
  ];

  // 社群動態數據
  const communityPosts = [
    { id: 1, user: 'K-pop愛好者', content: '剛收到NewJeans演唱會中籤通知！太開心了！', likes: 234, comments: 45, time: '2分鐘前', hashtags: ['#NewJeans', '#演唱會'] },
    { id: 2, user: '音樂迷小王', content: 'BLACKPINK的應援燈真的太美了，質感超棒！', likes: 189, comments: 32, time: '15分鐘前', hashtags: ['#BLACKPINK', '#應援燈'] },
    { id: 3, user: 'ARMY台灣', content: 'BTS新巡演的消息讓我太興奮了，一定要搶到票！', likes: 567, comments: 89, time: '1小時前', hashtags: ['#BTS', '#YetToCome'] },
    { id: 4, user: 'IU粉絲', content: '今天的演唱會太棒了！IU的聲音就是天籟', likes: 445, comments: 67, time: '3小時前', hashtags: ['#IU', '#演唱會回顧'] },
    { id: 5, user: 'Once 愛 Twice', content: 'Twice 真的要來台灣了！快拿走我的錢><', likes: 120073, comments: 963, time: '3小時前', hashtags: ['Twice', '演唱會'] }
  ];

  // 熱門關鍵字
  const trendingHashtags = [
    { tag: '#TWICE', count: 23328343, trend: 'hot' },
    { tag: '#NewJeans演唱會', count: 12543, trend: 'up' },
    { tag: '#BLACKPINK應援', count: 8901, trend: 'up' },
    { tag: '#BTS新巡演', count: 15678, trend: 'new' },
    { tag: '#IU台北場', count: 6754, trend: 'up' },
    { tag: '#應援燈開箱', count: 4532, trend: 'new' },
    { tag: '#演唱會穿搭', count: 3421, trend: 'up' }
  ];

  return (
    <div className="bg-black text-gray-900 -mt-20">
      {/* 上方 - 輪播 Banner 區 */}
      <section 
        className="relative md:min-h-screen min-h-[500px] h-[80vh] flex flex-col md:justify-center justify-end overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 背景輪播圖 - 桌面版 */}
        <div className="hidden md:block absolute inset-0 w-full aspect-video">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBannerIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full p-24"
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${banners[currentBannerIndex].image})`,
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 背景輪播圖 - 移動版 (優化載入和顯示) */}
        <div className="md:hidden absolute inset-0 w-full mt-20 aspect-video">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBannerIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 w-full aspect-video"
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat transform scale-105"
                style={{
                  backgroundImage: `url(${banners[currentBannerIndex].image})`,
                  backgroundPosition: 'center 30%', // 移動端優化焦點位置
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 漸層遮罩 - 響應式優化 */}
        <div className="opacity-50 md:opacity-100 absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 md:from-black/60 md:via-black/40 md:to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 md:from-black/30 md:via-transparent md:to-black/30" />

        {/* 主要內容 */}
        <div className=" relative z-10 px-4 sm:px-6 lg:px-8 py-24 sm:py-16 md:py-20 max-w-7xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center space-y-6 sm:space-y-8 md:space-y-12"
          >
            {/* 標題區塊 - 移動端優化 */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-[0.9] sm:leading-[0.85] text-white drop-shadow-2xl px-2"
              >
                {banners[currentBannerIndex].title}
              </motion.h1>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="hidden md:block text-base sm:text-lg md:text-2xl lg:text-3xl text-gray-100 font-light drop-shadow-lg px-4"
              >
                {banners[currentBannerIndex].subtitle}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="hidden md:block text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-xl md:max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md px-4"
              >
                {banners[currentBannerIndex].description}
              </motion.p>
            </div>

            {/* 倒數計時器 - 移動端優化 */}
            {banners[currentBannerIndex].hasCountdown && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="bg-black/40 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md md:max-w-lg mx-auto border border-white/20 mx-4"
              >
                <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                  <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                  <span className="text-orange-400 font-medium text-sm sm:text-base">登記截止倒數</span>
                </div>
                <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 text-center">
                  {[
                    { label: '天', value: timeLeft.days },
                    { label: '時', value: timeLeft.hours },
                    { label: '分', value: timeLeft.minutes },
                    { label: '秒', value: timeLeft.seconds }
                  ].map((item, index) => (
                    <div key={index} className="space-y-1 sm:space-y-2">
                      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white bg-white/15 rounded-lg sm:rounded-xl py-2 sm:py-3 px-1 sm:px-2 backdrop-blur-sm">
                        {item.value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-300">{item.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA 按鈕 - 移動端優化 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 px-4"
            >
              <Link href={banners[currentBannerIndex].ctaLink} className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-all duration-300 shadow-2xl backdrop-blur-sm min-h-[48px] ${
                    banners[currentBannerIndex].status === 'lottery'
                      ? 'bg-orange-500 hover:bg-orange-400 text-white active:bg-orange-600'
                      : 'bg-white hover:bg-gray-100 text-gray-900 active:bg-gray-200'
                  }`}
                >
                  {banners[currentBannerIndex].cta}
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hidden md:block text-white/80 hover:text-white active:text-white/90 transition-colors text-sm sm:text-base md:text-lg font-light underline underline-offset-4 py-2 px-4 min-h-[44px]"
              >
                了解更多詳情
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* 輪播控制 - 響應式優化 */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 sm:gap-3 md:gap-4 z-20">
          {/* 左箭頭 - 移動端優化觸控區域 */}
          <button
            onClick={() => setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length)}
            className="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 transition-colors backdrop-blur-sm min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="上一張"
          >
            <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
          
          {/* 指示器 - 移動端優化 */}
          <div className="flex space-x-1 sm:space-x-2 px-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBannerIndex(index)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 min-w-[16px] min-h-[16px] flex items-center justify-center ${
                  index === currentBannerIndex 
                    ? 'bg-white w-6 sm:w-8' 
                    : 'bg-white/50 hover:bg-white/70 active:bg-white/80 w-2 sm:w-2.5'
                }`}
                aria-label={`切換到第 ${index + 1} 張`}
              />
            ))}
          </div>
          
          {/* 右箭頭 - 移動端優化觸控區域 */}
          <button
            onClick={() => setCurrentBannerIndex((prev) => (prev + 1) % banners.length)}
            className="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 transition-colors backdrop-blur-sm min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="下一張"
          >
            <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
        </div>

        {/* 滑動手勢提示 - 僅移動端顯示 */}
        <div className="hidden absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="flex items-center gap-2 text-white/60 text-xs"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span>滑動切換</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* 中間 - 推薦活動 & 周邊區 */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 標題 - 移動端優化 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-gray-900 mb-3 sm:mb-4 tracking-tight px-4">精選推薦</h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-light px-4">為您量身打造的音樂體驗</p>
          </motion.div>

          {/* Tab 切換 - 移動端優化 */}
          <div className="flex justify-center mb-8 sm:mb-10 md:mb-12 px-4">
            <div className="bg-white rounded-full p-1 shadow-lg w-full max-w-sm sm:max-w-none sm:w-auto">
              <div className="grid grid-cols-2 sm:flex">
                <button
                //??????
                  onClick={() => {setActiveTab('events')}}
                  className={`px-4 sm:px-6 py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base min-h-[44px] ${
                    activeTab === 'events'
                      ? 'bg-gray-900 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 active:text-gray-900'
                  }`}
                >
                  演出活動
                </button>
                <button
                  onClick={() => {setActiveTab('merchandise')}}
                  className={`px-4 sm:px-6 py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base min-h-[44px] ${
                    activeTab === 'merchandise'
                      ? 'bg-gray-900 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 active:text-gray-900'
                  }`}
                >
                  周邊商品
                </button>
              </div>
            </div>
          </div>

          {/* 內容區 */}
          <AnimatePresence mode="wait">
            {activeTab === 'events' ? (
              <motion.div
                key="events"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
              >
                {featuredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                    className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group relative"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${event.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className={`px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm ${
                          event.tag === '熱門' ? 'bg-red-500/90 text-white' :
                          event.tag === '即將開放' ? 'bg-blue-500/90 text-white' :
                          event.tag === '搶先預告' ? 'bg-purple-500/90 text-white' :
                          'bg-orange-500/90 text-white'
                        }`}>
                          {event.tag}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(`event-${event.id}`);
                        }}
                        className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 active:bg-white/40 transition-colors"
                        aria-label="收藏"
                      >
                        {favorites.has(`event-${event.id}`) ? (
                          <HeartSolidIcon className="w-5 h-5 text-red-500" />
                        ) : (
                          <HeartIcon className="w-5 h-5 text-white" />
                        )}
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-medium text-gray-900">{event.artist}</h3>
                        <span className="text-lg font-medium text-gray-900">NT$ {event.price} 起</span>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">{event.title}</p>
                      <div className="space-y-2.5 text-sm text-gray-500 mb-6">
                        <div className="flex items-center gap-2">
                          <ClockIcon className="w-4 h-4 text-gray-400" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="truncate">{event.venue}</span>
                        </div>
                      </div>
                      {event.status === "sold-out" 
                      ? <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full py-3 rounded-xl font-medium text-base shadow-sm 
                            bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700`}
                          disabled
                        >
                          已售完
                        </motion.button>
                      :<Link 
                        href={event.status === 'announced' 
                          ? `/reminders/notification?artist=${encodeURIComponent(event.artist)}&title=${encodeURIComponent(event.title)}&date=${encodeURIComponent(event.date)}&venue=${encodeURIComponent(event.venue)}&price=${encodeURIComponent(event.price)}&id=${event.id}`
                          : event.status === 'presale' 
                            ? `/tickets`
                            : `/tickets/${event.id}`} 
                        className="block"
                      >
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full py-3 rounded-xl font-medium text-base shadow-sm ${
                            event.status === 'lottery' ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 active:from-orange-700 active:to-pink-700 text-white' :
                            event.status === 'presale' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 active:from-blue-700 active:to-indigo-700 text-white' :
                            'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 active:from-gray-300 active:to-gray-400 text-gray-700'
                          }`}
                         
                        >
                          {event.status === 'lottery'
                            ? '立即登記抽選'
                            : event.status === 'presale'
                              ? '查看詳情'
                              : '設定提醒'
                          }
                        </motion.button>
                      </Link>}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="merchandise"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
              >
                {featuredMerchandise.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                    className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                        <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${
                          item.tag === '限量' ? 'bg-red-500 text-white' :
                          item.tag === '熱賣' ? 'bg-orange-500 text-white' :
                          item.tag === '即將售罄' ? 'bg-purple-500 text-white' :
                          'bg-green-500 text-white'
                        }`}>
                          {item.tag}
                        </span>
                      </div>
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                        <button
                          onClick={() => toggleFavorite(`merch-${item.id}`)}
                          className="p-1.5 sm:p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white active:bg-gray-100 transition-colors min-w-[32px] min-h-[32px] sm:min-w-[36px] sm:min-h-[36px] flex items-center justify-center"
                          aria-label="收藏"
                        >
                          {favorites.has(`merch-${item.id}`) ? (
                            <HeartSolidIcon className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                          ) : (
                            <HeartIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4">
                      <div className="text-xs sm:text-sm text-gray-500 mb-1">{item.artist}</div>
                      <h3 className="font-light text-gray-900 mb-2 text-sm sm:text-base line-clamp-2">{item.name}</h3>
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <span className="text-base sm:text-lg font-medium text-gray-900">NT$ {item.price}</span>
                        <span className={`text-xs sm:text-sm ${item.stock < 20 ? 'text-red-500' : 'text-gray-500'}`}>
                          剩餘 {item.stock}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/merchandise/${item.id}`} className="flex-1">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-2 sm:py-2.5 bg-gray-900 text-white rounded-full text-xs sm:text-sm font-medium hover:bg-gray-800 active:bg-black transition-colors min-h-[36px] sm:min-h-[40px]"
                          >
                            立即購買
                          </motion.button>
                        </Link>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 border border-gray-300 rounded-full hover:border-gray-400 active:border-gray-500 transition-colors min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center"
                          aria-label="加入購物車"
                        >
                          <ShoppingCartIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 下方 - 粉絲社群即時區 */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 標題 - 移動端優化 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-gray-900 mb-3 sm:mb-4 tracking-tight px-4">粉絲社群</h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-light px-4">即時分享，熱情交流</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* 粉絲動態牆 */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-light text-gray-900 flex items-center gap-2">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  即時動態
                </h3>
                <Link href="/community" className="text-gray-500 hover:text-gray-900 active:text-gray-900 transition-colors text-xs sm:text-sm">
                  查看更多 →
                </Link>
              </div>
              <div className="space-y-4">
                {communityPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-medium text-xs sm:text-sm flex-shrink-0">
                        {post.user[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-900 text-sm sm:text-base truncate">{post.user}</span>
                          <span className="text-gray-500 text-xs sm:text-sm flex-shrink-0">{post.time}</span>
                        </div>
                        <p className="text-gray-700 mb-2 sm:mb-3 text-sm sm:text-base leading-relaxed">{post.content}</p>
                        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-2">
                          <button className="flex items-center gap-1 hover:text-red-500 active:text-red-600 transition-colors min-h-[32px]">
                            <HeartIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className="tabular-nums">{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-blue-500 active:text-blue-600 transition-colors min-h-[32px]">
                            <ChatBubbleLeftRightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className="tabular-nums">{post.comments}</span>
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {post.hashtags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="text-blue-600 text-xs sm:text-sm hover:text-blue-800 active:text-blue-900 cursor-pointer transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 熱門關鍵字 */}
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-light text-gray-900 flex items-center gap-2">
                  <HashtagIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  熱門話題
                </h3>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-orange-500 border-t-transparent rounded-full"
                />
              </div>
              <div className="space-y-3">
                {trendingHashtags.map((hashtag, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-gray-100 active:bg-gray-200 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors text-sm sm:text-base">
                          {hashtag.tag}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          {hashtag.count.toLocaleString()} 則貼文
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {hashtag.trend === 'hot' ? (
                          <FireIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                        ) : hashtag.trend === 'up' ? (
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        ) : (
                          <span className="text-xs bg-blue-100 text-blue-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">新</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* 參與互動 CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
                className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl border border-purple-100"
              >
                <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-2">加入討論</h4>
                <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">分享你的 K-pop 時刻，與其他粉絲一起交流</p>
                <Link href="/community">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg active:shadow-md transition-all text-sm sm:text-base min-h-[44px]"
                  >
                    立即參與
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
