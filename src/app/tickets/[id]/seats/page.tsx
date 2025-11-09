'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SeatMap() {
  const [selectedSeat, setSelectedSeat] = useState<string | null>('A15-10');
  const [zoomLevel, setZoomLevel] = useState(1);

  // 模擬演出和座位資料
  const eventData = {
    artist: 'NewJeans',
    tour: 'Get Up World Tour', 
    date: '2025.03.15',
    time: '19:30',
    venue: '台北小巨蛋'
  };

  const userSeats = [
    { section: 'A區', row: 15, seat: 10, id: 'A15-10' },
    { section: 'A區', row: 15, seat: 11, id: 'A15-11' }
  ];

  // 固定座位圖數據
  const generateSeatMap = () => {
    const sections = ['VIP', 'A', 'B', 'C', 'D'];
    const seatMap: Record<string, Array<Array<{
      id: string;
      row: number;
      seat: number;
      isUserSeat: boolean;
      isOccupied: boolean;
      isAvailable: boolean;
    }>>> = {};
    
    // 預定義的佔用座位（固定不變）- 模擬真實的售票情況
    const occupiedSeats = new Set([
      // VIP區 - 較高的佔用率
      'VIP1-1', 'VIP1-2', 'VIP1-5', 'VIP1-6', 'VIP1-8', 'VIP1-9', 'VIP1-12',
      'VIP2-3', 'VIP2-4', 'VIP2-6', 'VIP2-7', 'VIP2-9', 'VIP2-10', 
      'VIP3-1', 'VIP3-2', 'VIP3-5', 'VIP3-7', 'VIP3-8', 'VIP3-11',
      'VIP4-3', 'VIP4-6', 'VIP4-9', 'VIP4-12',
      'VIP5-1', 'VIP5-4', 'VIP5-8', 'VIP5-10',
      
      // A區 - 中等佔用率（用戶座位周圍）
      'A1-1', 'A1-3', 'A1-8', 'A1-12', 'A1-16',
      'A2-2', 'A2-5', 'A2-9', 'A2-14', 'A3-4', 'A3-11',
      'A5-1', 'A5-6', 'A5-13', 'A6-3', 'A6-8', 'A6-15',
      'A10-2', 'A10-7', 'A10-12', 'A12-4', 'A12-9',
      'A14-1', 'A14-5', 'A14-14', 'A15-3', 'A15-5', 'A15-7', 'A15-13', 'A15-15',
      'A16-3', 'A16-8', 'A16-13', 'A18-2', 'A18-6', 'A18-11',
      
      // B區 - 較分散的佔用
      'B1-2', 'B1-7', 'B1-15', 'B2-4', 'B2-12', 'B2-18',
      'B5-1', 'B5-8', 'B5-16', 'B8-3', 'B8-11', 'B8-19',
      'B12-5', 'B12-13', 'B15-2', 'B15-9', 'B15-17',
      'B18-6', 'B18-14', 'B20-4', 'B20-10', 'B20-16', 'B22-6', 'B22-14',
      
      // C區 - 較少佔用
      'C1-3', 'C1-9', 'C1-18', 'C3-5', 'C3-14', 'C3-22',
      'C8-2', 'C8-11', 'C8-20', 'C12-6', 'C12-15',
      'C18-4', 'C18-13', 'C18-21', 'C25-1', 'C25-8',
      'C25-16', 'C28-3', 'C28-12', 'C28-19',
      
      // D區 - 最少佔用
      'D5-2', 'D5-10', 'D5-20', 'D10-5', 'D10-15',
      'D15-3', 'D15-12', 'D15-22', 'D20-7', 'D20-17',
      'D25-4', 'D25-13', 'D25-21', 'D28-6', 'D28-16'
    ]);
    
    sections.forEach(section => {
      seatMap[section] = [];
      const rows = section === 'VIP' ? 8 : section === 'A' ? 20 : section === 'B' ? 25 : 30;
      const seatsPerRow = section === 'VIP' ? 12 : section === 'A' ? 16 : section === 'B' ? 20 : 24;
      
      for (let row = 1; row <= rows; row++) {
        const rowSeats = [];
        for (let seat = 1; seat <= seatsPerRow; seat++) {
          const seatId = `${section}${row}-${seat}`;
          const isUserSeat = userSeats.some(s => s.id === seatId);
          const isOccupied = occupiedSeats.has(seatId);
          
          rowSeats.push({
            id: seatId,
            row,
            seat,
            isUserSeat,
            isOccupied: !isUserSeat && isOccupied,
            isAvailable: !isUserSeat && !isOccupied
          });
        }
        seatMap[section].push(rowSeats);
      }
    });
    
    return seatMap;
  };

  const seatMap = generateSeatMap();

  const getSeatColor = (seat: { isUserSeat: boolean; isOccupied: boolean; isAvailable: boolean }) => {
    if (seat.isUserSeat) return 'bg-blue-500 text-white'; // 用戶座位
    if (seat.isOccupied) return 'bg-gray-400 text-white'; // 已佔用
    if (seat.isAvailable) return 'bg-green-200 text-green-800'; // 可選
    return 'bg-gray-200 text-gray-500'; // 不可選
  };

  return (
    <div className="min-h-screen bg-white -mt-20">
      {/* Header */}
      <section className="pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-2">
                  座位圖
                </h1>
                <p className="text-gray-600 font-light text-sm sm:text-base">
                  {eventData.artist} - {eventData.tour}
                </p>
              </div>
              
              <div className="flex items-center space-x-3 sm:space-x-4 justify-center sm:justify-end">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors text-sm sm:text-base"
                >
                  −
                </motion.button>
                <span className="text-xs sm:text-sm text-gray-600 min-w-[2.5rem] sm:min-w-[3rem] text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.1))}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors text-sm sm:text-base"
                >
                  +
                </motion.button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-xs sm:text-sm space-y-1 sm:space-y-0">
              <span className="text-gray-500">演出時間：{eventData.date} {eventData.time}</span>
              <span className="text-gray-500">場地：{eventData.venue}</span>
            </div>

            {/* 售票狀態 */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4 mt-4 sm:mt-6">
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4 text-xs sm:text-sm">
                <div className="text-center">
                  <div className="text-sm sm:text-lg font-light text-blue-900">VIP區</div>
                  <div className="text-xs text-blue-600">85% 已售出</div>
                </div>
                <div className="text-center">
                  <div className="text-sm sm:text-lg font-light text-blue-900">A區</div>
                  <div className="text-xs text-blue-600">72% 已售出</div>
                </div>
                <div className="text-center">
                  <div className="text-sm sm:text-lg font-light text-blue-900">B區</div>
                  <div className="text-xs text-blue-600">58% 已售出</div>
                </div>
                <div className="text-center">
                  <div className="text-sm sm:text-lg font-light text-blue-900">C區</div>
                  <div className="text-xs text-blue-600">35% 已售出</div>
                </div>
                <div className="text-center">
                  <div className="text-sm sm:text-lg font-light text-blue-900">D區</div>
                  <div className="text-xs text-blue-600">28% 已售出</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 lg:gap-8">
            
            {/* 座位圖 */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-50 rounded-2xl p-4 sm:p-6 lg:p-8 overflow-auto"
                style={{ maxHeight: '70vh', minHeight: '400px' }}
              >
                {/* 舞台 */}
                <div className="text-center mb-8 sm:mb-12">
                  <div className="inline-block bg-gray-900 text-white px-6 sm:px-12 py-2 sm:py-4 rounded-2xl text-sm sm:text-lg font-light">
                    舞台
                  </div>
                </div>

                {/* 座位區域 */}
                <div 
                  className="space-y-6 sm:space-y-8 lg:space-y-12 transition-transform duration-300"
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
                >
                  {Object.entries(seatMap).map(([section, rows]) => (
                    <div key={section} className="text-center">
                      <h3 className="text-base sm:text-lg font-light text-gray-900 mb-2 sm:mb-4">
                        {section === 'VIP' ? 'VIP區' : `${section}區`}
                      </h3>
                      
                      <div className="space-y-0.5 sm:space-y-1">
                        {rows.map((row, rowIndex: number) => (
                          <div key={rowIndex} className="flex justify-center items-center space-x-0.5 sm:space-x-1">
                            <span className="text-xs text-gray-500 w-6 sm:w-8 text-right">
                              {row[0]?.row}
                            </span>
                            
                            <div className="flex space-x-0.5 sm:space-x-1">
                              {row.map((seat) => (
                                <motion.button
                                  key={seat.id}
                                  whileHover={{ scale: seat.isUserSeat ? 1.2 : 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => seat.isUserSeat && setSelectedSeat(seat.id)}
                                  className={`w-4 h-4 sm:w-6 sm:h-6 text-xs rounded flex items-center justify-center transition-all ${getSeatColor(seat)} ${
                                    seat.isUserSeat ? 'ring-1 sm:ring-2 ring-blue-300 cursor-pointer' : 
                                    seat.isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'
                                  } ${selectedSeat === seat.id ? 'ring-2 sm:ring-4 ring-blue-400' : ''}`}
                                  disabled={!seat.isUserSeat && !seat.isAvailable}
                                  title={seat.isUserSeat ? `您的座位：${seat.id}` : seat.isOccupied ? '已售出' : '可購買'}
                                >
                                  <span className="hidden sm:inline">{seat.seat}</span>
                                </motion.button>
                              ))}
                            </div>
                            
                            <span className="text-xs text-gray-500 w-6 sm:w-8 text-left">
                              {row[0]?.row}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* 座位資訊面板 */}
            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
              
              {/* 圖例 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-gray-50 rounded-2xl p-4 sm:p-6"
              >
                <h3 className="text-base sm:text-lg font-light text-gray-900 mb-3 sm:mb-4">圖例</h3>
                <div className="grid grid-cols-3 lg:grid-cols-1 gap-3 lg:space-y-3 lg:gap-0">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded"></div>
                    <span className="text-xs sm:text-sm text-gray-600">您的座位</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-200 rounded"></div>
                    <span className="text-xs sm:text-sm text-gray-600">可購買</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-400 rounded"></div>
                    <span className="text-xs sm:text-sm text-gray-600">已售出</span>
                  </div>
                </div>
              </motion.div>

              {/* 您的座位 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-6"
              >
                <h3 className="text-base sm:text-lg font-light text-blue-900 mb-3 sm:mb-4">您的座位</h3>
                <div className="space-y-2 sm:space-y-3">
                  {userSeats.map((seat, index) => (
                    <div 
                      key={index}
                      className={`p-3 bg-white rounded-xl border cursor-pointer transition-all ${
                        selectedSeat === seat.id ? 'border-blue-400 bg-blue-50' : 'border-blue-200'
                      }`}
                      onClick={() => setSelectedSeat(seat.id)}
                    >
                      <div className="font-light text-blue-900 text-sm sm:text-base">
                        {seat.section} {seat.row}排 {seat.seat}號
                      </div>
                      <div className="text-xs text-blue-600 mt-1">
                        票券編號：TK240315{seat.section.charAt(0)}{seat.row}{seat.seat}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* 場地資訊 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-gray-50 rounded-2xl p-4 sm:p-6"
              >
                <h3 className="text-base sm:text-lg font-light text-gray-900 mb-3 sm:mb-4">場地資訊</h3>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
                  <div>
                    <span className="text-gray-500">場地名稱</span>
                    <p className="text-gray-900 mt-1">{eventData.venue}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">地址</span>
                    <p className="text-gray-900 mt-1">台北市松山區南京東路四段2號</p>
                  </div>
                  <div>
                    <span className="text-gray-500">總座位數</span>
                    <p className="text-gray-900 mt-1">約 8,000 席</p>
                  </div>
                </div>
              </motion.div>

              {/* 操作按鈕 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="space-y-3"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gray-900 text-white rounded-full font-light hover:bg-gray-800 transition-colors text-sm sm:text-base"
                >
                  下載座位圖
                </motion.button>
                <Link href="/my-tickets">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors text-sm sm:text-base"
                  >
                    返回我的票券
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
