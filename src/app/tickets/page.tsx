'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { formatDate } from '@/lib/dateFormat';

export default function Tickets() {
  const [selectedFilter, setSelectedFilter] = useState('全部');
  const searchParams = useSearchParams();
  const viewOnlyEventId = searchParams.get('id');
  const isViewOnly = searchParams.get('viewOnly') === 'true';

  type event = {
    id: string;
    launcher: number;
    artist: string;
    name: string; // Changed from 'tour' to 'name'
    venue: string;
    venueAddress?: string; // Optional, if present in your data
    description: string;
    eventTime: string;
    drawTimeStart: string;
    drawTimeEnd: string;
    showDraw: string;
    image: string;
    status: string;
    imageUrl: string;
    minPrice?: number; // Might not always be present
  }

  const filters = ['全部', '抽選登記中', '即將開放', '已結束'];

  const getEventData = () => {
    const events = [
       {
        id: "1",
        launcher: 0,
        artist: "NewJeans",
        name: "NewJeans Get Up World Tour",
        venue: "台北小巨蛋",
        venueAddress: "台北小巨蛋",
        eventTime: formatDate("2025-03-15T19:00:00.000Z"),
        description: "與 NewJeans 一起感受最純真的音樂魅力",
        drawTimeStart: formatDate("2025-03-16T00:00:00.000Z"),
        drawTimeEnd: formatDate("2025-03-17T00:00:00.000Z"),
        showDraw: formatDate("2025-03-18T00:00:00.000Z"),
        image: "hash/51/dummy-newjeans-1.webp",
        imageUrl: "hash/51/dummy-newjeans-1.webp",
        status: "sold-out",
        minPrice: 3200
      },
     {
        id: "2",
        launcher: 0,
        artist: "BLACKPINK",
        name: "BLACKPINK Born Pink World Tour",
        venue: "台北小巨蛋",
        venueAddress: "台北小巨蛋",
        eventTime: formatDate("2025-04-20T19:00:00.000Z"),
        description: "BLACKPINK 最新巡迴演唱會",
        drawTimeStart: formatDate("2025-04-21T00:00:00.000Z"),
        drawTimeEnd: formatDate("2025-04-22T00:00:00.000Z"),
        showDraw: formatDate("2025-04-23T00:00:00.000Z"),
        image: "hash/51/dummy-blackpink-2.webp",
        imageUrl: "hash/51/dummy-blackpink-2.webp",
        status: "announced",
        minPrice: 2800
      },
    {
        id: "3",
        launcher: 0,
        artist: "BTS",
        name: "BTS Yet To Come",
        venue: "高雄世運主場館",
        venueAddress: "高雄世運主場館",
        eventTime: formatDate("2025-05-10T19:00:00.000Z"),
        description: "BTS 全新巡迴演唱會",
        drawTimeStart: formatDate("2025-05-11T00:00:00.000Z"),
        drawTimeEnd: formatDate("2025-05-12T00:00:00.000Z"),
        showDraw: formatDate("2025-05-13T00:00:00.000Z"),
        image: "hash/51/dummy-bts-3.webp",
        imageUrl: "hash/51/dummy-bts-3.webp",
        status: "announced",
        minPrice: 4500
      },
      {
        id: "4",
        launcher: 0,
        artist: "IU",
        name: "IU The Golden Hour",
        venue: "台北小巨蛋",
        venueAddress: "台北第一音樂中心",
        eventTime: formatDate("2025-10-10T19:00:07.000Z"),
        description: "IU 最新演唱會",
        drawTimeStart: formatDate("2025-10-11T07:00:07.000Z"),
        drawTimeEnd: formatDate("2025-10-12T07:00:07.000Z"),
        showDraw: formatDate("2025-10-13T07:00:07.000Z"),
        image: "hash/51/51a91f07e3f84e16cc89b8eda6657354b2206b01f5610b2716d92c13423814f6.webp",
        imageUrl: "hash/51/51a91f07e3f84e16cc89b8eda6657354b2206b01f5610b2716d92c13423814f6.webp",
        status: "sold-out",
        minPrice: 3800
      },
      {
        id: "5",
        launcher: 0,
        artist: "TWICE",
        name: "TWICE <THIS IS FOR> WORLD TOUR",
        venue: "高雄國家體育場",
        venueAddress: "高雄國家體育場",
        eventTime: formatDate("2025-11-22T19:00:00.000Z"),
        description: "TWICE <THIS IS FOR> WORLD TOUR",
        drawTimeStart: formatDate("2025-11-01T00:00:00.000Z"),
        drawTimeEnd: formatDate("2025-11-14T00:00:00.000Z"),
        showDraw: formatDate("2025-11-15T00:00:00.000Z"),
        image: "hash/51/51a91f07e3f84e16cc89b8eda6657354b2206b01f5610b2716d92c13423814f6.webp",
        imageUrl: "hash/51/51a91f07e3f84e16cc89b8eda6657354b2206b01f5610b2716d92c13423814f6.webp",
        status: "on-sale",
        minPrice: 100
      }
    ]
    return events;
  };

  // 使用 useMemo 來計算過濾後的活動列表，避免無限重新渲染
  const eventData = getEventData();
  const concerts = useMemo(() => {
    const filtered = selectedFilter === '全部' 
      ? eventData 
      : eventData?.filter(concert => {
          if (selectedFilter === '抽選登記中') return concert.status === 'on-sale';
          if (selectedFilter === '即將開放') return concert.status === 'announced' || concert.status === 'pre-sale';
          if (selectedFilter === '已結束') return concert.status === 'sold-out';
          return true;
        });
    
    // 直接返回過濾後的數據，因為 getEventData 返回的類型已經符合 event 類型
    return (filtered || []) as event[];
  }, [selectedFilter]);

  //     tour: 'Get Up World Tour',
  //     date: '2025.03.15',
  //     venue: '台北小巨蛋',
  //     status: 'on-sale',
  //     price: '3,200',
  //     image: 'bg-gradient-to-br from-pink-500 to-pink-400'
  //   },
  //   {
  //     id: 2,
  //     artist: 'BLACKPINK',
  //     tour: 'Born Pink World Tour',
  //     date: '2025.04.20',
  //     venue: '台北小巨蛋',
  //     status: 'pre-sale',
  //     price: '2,800',
  //     image: 'bg-gradient-to-br from-black to-black'
  //   },
  //   {
  //     id: 3,
  //     artist: 'BTS',
  //     tour: 'Yet To Come',
  //     date: '2025.05.10',
  //     venue: '高雄世運主場館',
  //     status: 'announced',
  //     price: '4,500',
  //     image: 'bg-gradient-to-br from-purple-500 to-purple-400'
  //   },
  //   {
  //     id: 4,
  //     artist: 'TWICE',
  //     tour: '5TH WORLD TOUR',
  //     date: '2025.06.15',
  //     venue: '台北小巨蛋',
  //     status: 'sold-out',
  //     price: '3,800',
  //     image: 'bg-gradient-to-br from-orange-500 to-orange-400'
  //   },
  //   {
  //     id: 5,
  //     artist: 'aespa',
  //     tour: 'MY WORLD',
  //     date: '2025.07.20',
  //     venue: '台北流行音樂中心',
  //     status: 'on-sale',
  //     price: '2,600',
  //     image: 'bg-gradient-to-br from-blue-500 to-blue-400'
  //   },
  //   {
  //     id: 6,
  //     artist: '(G)I-DLE',
  //     tour: 'World Tour',
  //     date: '2025.08.25',
  //     venue: '台北國際會議中心',
  //     status: 'announced',
  //     price: '2,200',
  //     image: 'bg-gradient-to-br from-red-500 to-red-400'
  //   }
  // ];



  const getStatusText = (status: string) => {
    switch (status) {
      case 'on-sale': return '抽選登記中';
      case 'pre-sale': return '即將開放登記';
      case 'announced': return '即將開放登記';
      case 'sold-out': return '登記已結束';
      default: return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-sale': return 'bg-orange-100 text-orange-800';
      case 'pre-sale': return 'bg-blue-100 text-blue-800';
      case 'announced': return 'bg-blue-100 text-blue-800';
      case 'sold-out': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-white -mt-20">
      {/* Hero Section */}
      <section className="pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8 text-center sm:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900">演出票券</h1>
            <p className="text-lg sm:text-xl text-gray-600 font-light max-w-2xl mx-auto sm:mx-0">
              精選演出，公平抽選
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 sm:space-x-8 border-b border-gray-200 overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`pb-4 font-light transition-colors whitespace-nowrap text-sm sm:text-base ${
                  selectedFilter === filter
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Concerts Grid */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {concerts?.map((concert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group cursor-pointer"
              >
                {/* Concert Image */}
                <div className={` aspect-[4/3] rounded-2xl mb-6 relative overflow-hidden`}>
                  <Image
                    src={concert.imageUrl && concert.imageUrl.startsWith('http') 
                      ? concert.imageUrl 
                      : `/banner-${index + 1}.jpg`}
                    alt={concert.artist || "concert image"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    fill
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(concert.status)}`}>
                      {getStatusText(concert.status)}
                    </span>
                  </div>
                </div>

                {/* Concert Info */}
                <div className="space-y-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-light text-gray-900 mb-1">
                      {concert.artist}
                    </h3>
                    <p className="text-sm text-gray-500">{concert.name}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">日期</span>
                      <span className="text-gray-900">{concert.eventTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">場地</span>
                      <span className="text-gray-900">{concert.venue}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">票價</span>
                      <span className="text-gray-900">NT$ {concert.minPrice || '0'} 起</span>
                    </div>
                  </div>

                  {/* 如果該活動是 viewOnly 模式（從首頁「查看詳情」跳轉而來），則禁用登記 */}
                  {concert.status === 'on-sale' && isViewOnly && viewOnlyEventId === concert.id ? (
                    <Link href={`/tickets/${concert.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-blue-500 text-white rounded-full font-light hover:bg-blue-600 transition-colors"
                      >
                        查看詳情
                      </motion.button>
                    </Link>
                  ) : concert.status === 'on-sale' ? (
                    <Link href={`/tickets/${concert.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-orange-500 text-white rounded-full font-light hover:bg-orange-600 transition-colors"
                      >
                        登記抽選
                      </motion.button>
                    </Link>
                  ) : concert.status === 'pre-sale' || concert.status === 'announced' ? (
                    <Link href={`/tickets/${concert.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-blue-500 text-white rounded-full font-light hover:bg-blue-600 transition-colors"
                      >
                        查看詳情
                      </motion.button>
                    </Link>
                  ) : concert.status === 'sold-out' ? (
                    <motion.button
                      disabled
                      className="w-full py-3 bg-gray-200 text-gray-400 rounded-full font-light cursor-not-allowed"
                    >
                      已結束
                    </motion.button>
                  ) : (
                    <Link href={`/tickets/${concert.id}/reminder`}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
                      >
                        提醒我
                      </motion.button>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
