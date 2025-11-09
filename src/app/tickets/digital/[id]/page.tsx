'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const normalizeQrSrc = (value?: string) => {
  if (!value) return "";
  if (/^(https?:)?\/\//i.test(value) || value.startsWith("data:")) return value;
  return `data:image/png;base64,${value}`;
};

export default function DigitalTicket({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [isLoading, setIsLoading] = useState(true);
  const [ticketData, setTicketData] = useState({
    id: resolvedParams.id,
    artist: 'TWICE',
    tour: 'TWICE <THIS IS FOR> WORLD TOUR',
    date: '2025.11.22',
    time: '19:00',
    venue: '高雄國家體育場',
    section: '普通票',
    row: '-',
    seat: '-',
    quantity: 1,
    ticketNumber: 'TWICE20251122-N-001234',
    purchaseDate: '2025.03.01',
    qrData: ""
  })

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const requestBody = {
      fields: [
        {
          ename: "name",
          content: userData.name
        },
        {
          ename: "ticket_id",
          content: "000001"
        },
        {
          ename: "ticket_number",
          content: "TWICE20251122-N-001234"
        },
        {
          ename: "id_number",
          content: userData.idNumber
        },
        {
          ename: "artist",
          content: "TWICE"
        },
        {
          ename: "price",
          content: "100"
        },
        {
          ename: "event_time",
          content: "2025/11/22-19:00"
        },
        {
          ename: "event_venue",
          content: "高雄國家體育場"
        },
        {
          ename: "ticket_type",
          content: "普通票"
        },
        {
          ename: "seat",
          content: "-"
        }
      ]
    };

    async function fetchData() {
      const res = await fetch("/api/qrcode/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const tix = ticketData;
      await res.json().then((data)=>{
        tix.qrData = data.qrCode;
        setIsLoading(false);
      })
      setTicketData(tix);
    }
    fetchData();
  }, [])


  if (isLoading) {
    return (
      <div className="min-h-screen bg-white -mt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">載入票券中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white -mt-20">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-light text-gray-900 mb-2">
                數位票券
              </h1>
              <p className="text-gray-600 font-light">
                請向工作人員出示此 QR Code
              </p>
            </div>

            {/* Ticket Card */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl overflow-hidden shadow-lg">
              {/* Ticket Header */}
              <div className="bg-gray-900 text-white p-6 text-center">
                <h2 className="text-xl font-light mb-2">{ticketData.artist}</h2>
                <p className="text-gray-300 text-sm">{ticketData.tour}</p>
              </div>

              {/* QR Code Section */}
              <div className="p-8">
                <div className="text-center mb-6">
                  <Image 
                    src={normalizeQrSrc(ticketData.qrData)} 
                    alt="QR Code"
                    className="w-full h-auto max-w-full max-h-full object-contain"
                    width={64}
                    height={64}
                  />
                </div>

                {/* Ticket Details */}
                <div className="space-y-4 border-t border-gray-200 pt-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">演出日期</span>
                      <p className="font-medium">{ticketData.date}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">演出時間</span>
                      <p className="font-medium">{ticketData.time}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">場地</span>
                      <p className="font-medium">{ticketData.venue}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">座位</span>
                      <p className="font-medium">{ticketData.section} {ticketData.row == "-" ? "" :ticketData.row + "排"} {ticketData.seat == "-" ? "" :ticketData.seat}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">票券數量</span>
                      <p className="font-medium">{ticketData.quantity} 張</p>
                    </div>
                    <div>
                      <span className="text-gray-500">票券編號</span>
                      <p className="font-mono text-xs">{ticketData.ticketNumber}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ticket Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="text-xs text-gray-500 text-center space-y-1">
                  <p>購買日期：{ticketData.purchaseDate}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 flex flex-col">
              <div className="text-center">
                <Link href="/my-tickets">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-gray-500 hover:text-gray-700 transition-colors font-light"
                  >
                    返回我的票券
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
