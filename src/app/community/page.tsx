'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { HeartIcon, ChatBubbleLeftRightIcon, HashtagIcon, FireIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

export default function Community() {
  const [activeTab, setActiveTab] = useState('latest'); // latest, trending, following
  const [likedPosts, setLikedPosts] = useState(new Set());

  const toggleLike = (postId: string) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
  };

  // 社群貼文數據
  const communityPosts = [
    { 
      id: '1', 
      user: 'K-pop愛好者', 
      avatar: 'K',
      content: '剛收到NewJeans演唱會中籤通知！太開心了！終於可以親眼看到她們的表演了 🎉', 
      image: '/banner-1.jpg',
      likes: 234, 
      comments: 45, 
      time: '2分鐘前', 
      hashtags: ['#NewJeans', '#演唱會', '#中籤'] 
    },
    { 
      id: '2', 
      user: '音樂迷小王', 
      avatar: '音',
      content: 'BLACKPINK的應援燈真的太美了，質感超棒！拿在手上的感覺就像拿著一顆星星 ✨', 
      image: '/banner-2.jpg',
      likes: 189, 
      comments: 32, 
      time: '15分鐘前', 
      hashtags: ['#BLACKPINK', '#應援燈', '#開箱'] 
    },
    { 
      id: '3', 
      user: 'ARMY台灣', 
      avatar: 'A',
      content: 'BTS新巡演的消息讓我太興奮了，一定要搶到票！這次的舞台設計聽說會很特別', 
      likes: 567, 
      comments: 89, 
      time: '1小時前', 
      hashtags: ['#BTS', '#YetToCome', '#巡演'] 
    },
    { 
      id: '4', 
      user: 'IU粉絲', 
      avatar: 'I',
      content: '今天的演唱會太棒了！IU的聲音就是天籟，現場的氛圍讓人感動到流淚 😭', 
      image: '/banner-4.jpg',
      likes: 445, 
      comments: 67, 
      time: '3小時前', 
      hashtags: ['#IU', '#演唱會回顧', '#感動'] 
    },
    { 
      id: '5', 
      user: 'K-pop收藏家', 
      avatar: 'K',
      content: '分享一下我的專輯收藏！從第一張到最新的都有，每一張都是回憶 📀', 
      likes: 892, 
      comments: 156, 
      time: '5小時前', 
      hashtags: ['#專輯收藏', '#K-pop', '#回憶'] 
    },
    { 
      id: '6', 
      user: '演唱會達人', 
      avatar: '演',
      content: '給新手的演唱會攻略：1. 提早到場 2. 準備應援物 3. 充好電 4. 享受音樂！', 
      likes: 1203, 
      comments: 234, 
      time: '8小時前', 
      hashtags: ['#演唱會攻略', '#新手必看', '#分享'] 
    }
  ];

  // 熱門話題
  const trendingTopics = [
    { tag: '#NewJeans演唱會', count: 15234, trend: 'hot' },
    { tag: '#BLACKPINK應援', count: 12890, trend: 'up' },
    { tag: '#BTS新巡演', count: 18567, trend: 'hot' },
    { tag: '#IU台北場', count: 8754, trend: 'up' },
    { tag: '#應援燈開箱', count: 5432, trend: 'new' },
    { tag: '#演唱會穿搭', count: 4321, trend: 'up' },
    { tag: '#專輯收藏', count: 6789, trend: 'up' },
    { tag: '#K-pop新手', count: 3456, trend: 'new' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-0">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">粉絲社群</h1>
            <p className="text-gray-600">與其他 K-pop 愛好者分享你的熱情</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 主要內容區 */}
          <div className="lg:col-span-3">
            {/* 發文區域 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-white rounded-2xl p-6 mb-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-medium">
                  你
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="分享你的 K-pop 時刻..."
                    className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors">
                        <PhotoIcon className="w-5 h-5" />
                        <span className="text-sm">照片</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors">
                        <HashtagIcon className="w-5 h-5" />
                        <span className="text-sm">話題</span>
                      </button>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg transition-all"
                    >
                      發布
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tab 切換 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex gap-1 mb-6 bg-white rounded-full p-1 shadow-sm"
            >
              {[
                { id: 'latest', name: '最新' },
                { id: 'trending', name: '熱門' },
                { id: 'following', name: '追蹤' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </motion.div>

            {/* 貼文列表 */}
            <div className="space-y-6">
              {communityPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900">{post.user}</span>
                        <span className="text-gray-500 text-sm">{post.time}</span>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
                      
                     
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.hashtags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-blue-600 text-sm hover:text-blue-800 cursor-pointer transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-6 text-gray-500">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className="flex items-center gap-2 hover:text-red-500 transition-colors"
                        >
                          {likedPosts.has(post.id) ? (
                            <HeartSolidIcon className="w-5 h-5 text-red-500" />
                          ) : (
                            <HeartIcon className="w-5 h-5" />
                          )}
                          <span className="tabular-nums">
                            {likedPosts.has(post.id) ? post.likes + 1 : post.likes}
                          </span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                          <ChatBubbleLeftRightIcon className="w-5 h-5" />
                          <span className="tabular-nums">{post.comments}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 載入更多 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-center mt-8"
            >
              <button className="px-8 py-3 bg-white text-gray-600 rounded-full border border-gray-200 hover:border-gray-300 hover:text-gray-900 transition-colors">
                載入更多貼文
              </button>
            </motion.div>
          </div>

          {/* 側邊欄 */}
          <div className="space-y-6">
            {/* 熱門話題 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-light text-gray-900 flex items-center gap-2">
                  <HashtagIcon className="w-6 h-6" />
                  熱門話題
                </h3>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full"
                />
              </div>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05, duration: 0.6 }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer group transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {topic.tag}
                      </div>
                      <div className="text-sm text-gray-500">
                        {topic.count.toLocaleString()} 則貼文
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {topic.trend === 'hot' ? (
                        <FireIcon className="w-5 h-5 text-red-500" />
                      ) : topic.trend === 'up' ? (
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      ) : (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">新</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 推薦用戶 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-light text-gray-900 mb-6">推薦關注</h3>
              <div className="space-y-4">
                {[
                  { name: 'K-pop情報站', followers: '12.5K', avatar: 'K' },
                  { name: '演唱會攻略', followers: '8.9K', avatar: '演' },
                  { name: '專輯收藏家', followers: '15.2K', avatar: '專' }
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.followers} 粉絲</div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                      關注
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
