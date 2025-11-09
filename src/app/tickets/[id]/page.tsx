'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { formatDate } from '@/lib/dateFormat';

export default function TicketDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [selectedSection, setSelectedSection] = useState("請選擇票種");
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [hasRegistered, setHasRegistered] = useState(false);
  
  type ticketType = {
    id: string;
    eventId: string;
    name: string;
    price: number;
    totalTickets: number;
    registered: number;
    remain: number;
    info: string;
    areaInfo: string;
    rights: string;
    paymentDeadline: string;
    maxTicketsPerPerson: number;
  }

  const [ticketTypeData, setTicketTypeData] = useState<ticketType[]>([{
    "id":"0a5b1d93-a9f8-4c2a-90ad-8b6f430659a2",
    "eventId": "f746549e-216d-4529-b3f6-ac388775e256",
    "name": "普通票",
    "price": 100,
    "totalTickets": 100,
    "registered": 100,
    "remain": 1000,
    "info": "超級演唱會",
    "areaInfo": "default location",
    "rights": "gogo",
    "paymentDeadline": formatDate("2025-10-15T02:15:54.756Z").slice(0, 10),
    "maxTicketsPerPerson": 10
  }]);
  
  const getEvent = {
    "id": "f746549e-216d-4529-b3f6-ac388775e256",
    "launcher": 0,
    "artist": "tester",
    "name": "超級演唱會",
    "venue": "台北流行音樂中心",
    "venueAddress": "台北第一音樂中心",
    "eventTime": "2025-10-10T07:00:07.000Z",
    "description": "string",
    "drawTimeStart": "2025-10-11T07:00:07.000Z",
    "drawTimeEnd": "2025-10-12T07:00:07.000Z",
    "showDraw": "2025-10-13T07:00:07.000Z",
    "image": "hash/51/51a91f07e3f84e16cc89b8eda6657354b2206b01f5610b2716d92c13423814f6.webp",
    "imageUrl": "hash/51/51a91f07e3f84e16cc89b8eda6657354b2206b01f5610b2716d92c13423814f6.webp",
    "status": "true"
  };

  const res = getEvent
  res.eventTime = formatDate(res.eventTime);
  res.drawTimeStart = formatDate(res.drawTimeStart);
  res.drawTimeEnd = formatDate(res.drawTimeEnd);
  res.showDraw = formatDate(res.showDraw);

  // // 根據 ID 獲取演出資訊
   const getEventData = (id: string) => {
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
     return events.filter(x => x.id == id)[0];
   };

   const eventData = getEventData(resolvedParams.id);

  // 檢查登入狀態和個人資料完整度
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const loginStatus = localStorage.getItem('isLoggedIn');
        const userData = localStorage.getItem('userData');
        
        if (loginStatus === 'true' && userData) {
          const user = JSON.parse(userData);
          
          // 檢查是否已經登記過這個演出
          const registrations = localStorage.getItem('lotteryRegistrations');
          const tickets = localStorage.getItem('myTickets');
          
          let hasActiveRegistration = false;
          
          // 先檢查 lotteryRegistrations 中是否有有效的登記記錄
          if (registrations) {
            try {
              const regs: Array<{eventId: string; userId: string; status?: string}> = JSON.parse(registrations);
              const existingReg = regs.find((reg) => 
                reg.eventId === eventData?.id && reg.userId === user.id
              );
              
              // 如果找到登記記錄且狀態不是 cancelled，則視為已登記
              if (existingReg && existingReg.status !== 'cancelled') {
                hasActiveRegistration = true;
              }
            } catch (e) {
              console.error('Error parsing registrations:', e);
            }
          }
          
          // 如果沒有有效的登記記錄，檢查 myTickets 中是否有該活動的非 cancelled 票券
          if (!hasActiveRegistration && tickets) {
            try {
              const ticketList: Array<{eventId: string; status?: string}> = JSON.parse(tickets);
              const activeTicket = ticketList.find((ticket) => 
                ticket.eventId === eventData?.id && ticket.status !== 'cancelled'
              );
              
              // 如果找到非 cancelled 的票券，則視為已登記
              if (activeTicket) {
                hasActiveRegistration = true;
              }
            } catch (e) {
              console.error('Error parsing tickets:', e);
            }
          }
          
          setHasRegistered(hasActiveRegistration);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };

    checkAuthStatus();

    // 監聽登入狀態變化
    const handleAuthChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('authStateChanged', handleAuthChange);

    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange);
    };
  }, [eventData?.id]);

  const selectedSectionData = ticketTypeData?.find(s => s.name === selectedSection);

  const handleLotteryRegistration = () => {
    if(selectedSection == "請選擇票種"){
      alert("請選擇票種");
      return;
    }
    try {
      // 獲取用戶資訊
      const userData = localStorage.getItem('userData');
      const userId = localStorage.getItem('userId');
      
      if (!userData || !userId) {
        alert("請先登入");
        return;
      }

      const user = JSON.parse(userData);
      const parsedUserId = JSON.parse(userId);
      
      // 獲取選中的票種資訊
      const selectedTicketType = ticketTypeData?.find(s => s.name === selectedSection);
      
      if (!selectedTicketType) {
        alert("票種資料錯誤");
        return;
      }

      // 生成登記 ID
      const registrationId = `reg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // 更新登記記錄（用於檢查是否已登記）
      const registrationsStr = localStorage.getItem('lotteryRegistrations');
      let registrations = [];
      
      if (registrationsStr) {
        try {
          registrations = JSON.parse(registrationsStr);
        } catch (e) {
          console.error('Error parsing registrations:', e);
        }
      }

      // 檢查是否已登記過這個活動
      const hasExistingReg = registrations.some(
        (reg: {eventId: string; userId: string}) => 
          reg.eventId === eventData?.id && reg.userId === parsedUserId
      );

      if (!hasExistingReg) {
        registrations.push({
          eventId: eventData?.id,
          userId: parsedUserId,
          registrationId: registrationId,
          section: selectedSection,
          quantity: ticketQuantity.toString()
        });
        localStorage.setItem('lotteryRegistrations', JSON.stringify(registrations));
      }
      // 執行抽選登記
      setHasRegistered(true);
      window.dispatchEvent(new Event('authStateChanged'));
      
      // 重定向到成功頁面
      setTimeout(() => {
        const params = new URLSearchParams({
          artist: eventData?.artist || "",
          section: selectedSection,
          quantity: ticketQuantity.toString()
        });
        window.location.href = `/lottery/success?${params.toString()}`;
      }, 1000);
    } catch (error) {
      console.error('Error saving registration:', error);
      alert("登記失敗，請稍後再試");
    }
  };

  return (
    <div className="min-h-screen bg-white -mt-20">
      {/* Hero Section - Max Braun minimalist style */}
      <section className="pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8 text-center sm:text-left"
          >
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                抽選登記中
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900">
                {eventData?.artist}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 font-light">
                {eventData?.name}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8">
              <div className="text-center sm:text-left">
                <div className="text-xs sm:text-sm text-gray-500 mb-1">演出日期</div>
                <div className="text-base sm:text-lg font-light text-gray-900">
                  {eventData?.eventTime}
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xs sm:text-sm text-gray-500 mb-1">演出場地</div>
                <div className="text-base sm:text-lg font-light text-gray-900">{eventData?.venue}</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xs sm:text-sm text-gray-500 mb-1">登記截止</div>
                <div className="text-base sm:text-lg font-light text-gray-900">{eventData?.drawTimeEnd}</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xs sm:text-sm text-gray-500 mb-1">開獎日期</div>
                <div className="text-base sm:text-lg font-light text-gray-900">{eventData?.showDraw}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ticket Selection */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Lottery Registration */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-6 sm:mb-8 text-center lg:text-left">抽選登記</h2>
              
              <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
                
                <div className="space-y-4">
                  {ticketTypeData?.map((section) => {
                    // const competitionRatio = (section.registered / section.totalTickets).toFixed(1);
                    return (
                      <motion.button
                        key={section.name}
                        onClick={() => setSelectedSection(section.name)}
                        whileHover={{ scale: eventData.status != "on-sale"?1:1.01 }}
                        whileTap={{ scale: eventData.status != "on-sale"?1:0.99 }}
                        className={`w-full p-6 rounded-2xl transition-all ${
                          selectedSection === section.name
                            ? 'bg-gray-900 text-white'
                            : eventData.status != "on-sale"?'bg-white border border-gray-200':'bg-white border border-gray-200 hover:border-gray-300'
                        }`}
                        disabled = {eventData.status != "on-sale"}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-left">
                            <div className="font-light text-lg">{section.name}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-light">
                              NT$ {section.price.toLocaleString()}
                            </div>
                            <div className={`text-xs ${
                              selectedSection === section.name ? 'text-gray-300' : 'text-gray-500'
                            }`}>
                              {section.totalTickets} 張
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Registration Panel */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 order-1 lg:order-2">
              <h3 className="text-lg sm:text-xl font-light text-gray-900 mb-6 sm:mb-8">登記資訊</h3>
              
              {hasRegistered ? (
                <div className="space-y-6">
                                      <div className="text-center p-6 bg-green-50 rounded-2xl">
                      <div className="text-2xl mb-4 text-green-600">成功</div>
                      <h4 className="text-lg font-light text-green-900 mb-2">登記成功</h4>
                      <p className="text-sm text-green-700">
                        您已成功登記 {selectedSection} {ticketQuantity} 張票券
                      </p>
                    </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">登記區域</span>
                      <span className="font-medium">{selectedSection}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">登記數量</span>
                      <span className="font-medium">{ticketQuantity} 張</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">開獎日期</span>
                      <span className="font-medium">{eventData?.showDraw}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm text-gray-600 mb-3">選擇區域</label>
                    <div className="bg-gray-900 text-white p-4 rounded-xl">
                      <div className="font-light">{selectedSection}</div>
                      <div className="text-sm text-gray-300">
                        NT$ {selectedSectionData?.price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-3">登記數量</label>
                    <div className="flex items-center justify-center space-x-6">
                      <motion.button
                        whileHover={{ scale: eventData.status != "on-sale"?1:1.1 }}
                        whileTap={{ scale: eventData.status != "on-sale"?1:0.9 }}
                        onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                        className={`w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center ${eventData.status != "on-sale"?"":"hover:bg-gray-300 transition-colors"}`}
                        disabled = {eventData.status != "on-sale"}
                      >
                        −
                      </motion.button>
                      <span className="text-2xl font-light min-w-[3rem] text-center">
                        {ticketQuantity}
                      </span>
                      <motion.button
                        whileHover={{ scale: eventData.status != "on-sale"?1:1.1 }}
                        whileTap={{ scale: eventData.status != "on-sale"?1:0.9 }}
                        onClick={() => setTicketQuantity(Math.min(selectedSectionData?.maxTicketsPerPerson || 10, ticketQuantity + 1))}
                        className={`w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center ${eventData.status != "on-sale"?"":"hover:bg-gray-300 transition-colors"}`}
                        disabled = {eventData.status != "on-sale"}
                      >
                        +
                      </motion.button>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-2">每人限登記{selectedSectionData?.maxTicketsPerPerson || 10}張</p>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">若中選票價</span>
                        <span>NT$ {((selectedSectionData?.price || 0) * ticketQuantity).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">手續費</span>
                        <span>NT$ 150</span>
                      </div>
                      <div className="flex justify-between text-base font-light border-t border-gray-200 pt-3">
                        <span>若中選總額</span>
                        <span>
                          NT$ {((selectedSectionData?.price || 0) * ticketQuantity + 150).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        付費期限：{selectedSectionData?.paymentDeadline}
                      </div>
                    </div>
                  </div>

                  {false ? (
                    <div className="space-y-4 flex flex-col">
                      <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                        <div className="text-sm text-yellow-800">
                          請先登入才能進行抽選登記
                        </div>
                      </div>
                      <Link href="/auth/login">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 bg-gray-900 text-white rounded-full font-light text-lg hover:bg-gray-800 transition-colors"
                        >
                          登入後登記
                        </motion.button>
                      </Link>
                    </div>
                  ) : false? (
                    <div className="space-y-4 flex flex-col">
                      <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                        <div className="text-sm text-yellow-800">
                          請先完善個人資料才能進行抽選登記
                        </div>
                      </div>
                      <Link href="/member/profile?complete=true">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 bg-orange-500 text-white rounded-full font-light text-lg hover:bg-orange-600 transition-colors"
                        >
                          完善資料
                        </motion.button>
                      </Link>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: eventData.status != "on-sale"?1:1.02 }}
                      whileTap={{ scale: eventData.status != "on-sale"?1:0.98 }}
                      onClick={handleLotteryRegistration}
                      className={`w-full py-4 bg-gray-900 text-white rounded-full font-light text-lg ${eventData.status != "on-sale"?"":"hover:bg-gray-800 transition-colors"}`}
                      disabled = {eventData.status != "on-sale"}
                    >
                      確認登記
                    </motion.button>
                  )}

                  <div className="mt-8 text-xs text-gray-500 space-y-1">
                    <p>• 每人限登記一次，重複登記無效</p>
                    <p>• 中選後須於期限內完成付費</p>
                    <p>• 逾期未付費視同放棄</p>
                    <p>• 可於會員中心管理登記</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Concert Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-2xl font-light text-gray-900 mb-12 text-center">演出資訊</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-light text-gray-900 mb-4">關於演出</h3>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>{eventData?.description}，將帶來包括熱門歌曲的精彩演出。</p>
                <p>演出時間約2.5小時，包含中場休息。</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-light text-gray-900 mb-4">抽選流程</h3>
              <div className="text-gray-600 space-y-2">
                <p>• 登記期間至 {eventData?.drawTimeEnd}</p>
                <p>• 開獎日期：{eventData?.showDraw}</p>
                <p>• 中選通知：電子郵件寄送</p>
                <p>• 付費期限：{selectedSectionData?.paymentDeadline}</p>
                <p>• 每人限登記 {/*concertData.maxTicketsPerPerson*/ 0 } 張</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-light text-gray-900 mb-4">注意事項</h3>
              <div className="text-gray-600 space-y-2">
                <p>• 演出開始後30分鐘內禁止入場</p>
                <p>• 場內禁止攝影、錄音及錄影</p>
                <p>• 請勿攜帶危險物品入場</p>
                <p>• 建議提早1小時到場</p>
                <p>• 本演出適合6歲以上觀賞</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}