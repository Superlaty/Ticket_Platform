"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function OrderDetail() {
  // 模擬訂單資料
  const orderData = {
    id: "TK20250315001",
    status: "confirmed",
    type: "ticket",
    createdAt: "2025.03.01 14:30",
    updatedAt: "2025.03.01 14:32",

    // 演出資訊
    event: {
      artist: "NewJeans",
      tour: "Get Up World Tour",
      date: "2025.03.15",
      time: "19:30",
      venue: "台北小巨蛋",
      venueAddress: "台北市松山區南京東路四段2號",
    },

    // 票券詳情
    tickets: [
      {
        section: "A區",
        row: "15排",
        seat: "10號",
        price: 3200,
        ticketNumber: "TK240315A1510",
      },
      {
        section: "A區",
        row: "15排",
        seat: "11號",
        price: 3200,
        ticketNumber: "TK240315A1511",
      },
    ],

    // 費用明細
    pricing: {
      subtotal: 6400,
      fees: 150,
      total: 6550,
    },

    // 購買者資訊
    buyer: {
      name: "林小美",
      email: "xiaomei@example.com",
      phone: "0912-345-678",
    },

    // 付款資訊
    payment: {
      method: "信用卡",
      cardLast4: "1234",
      transactionId: "TXN20250301143001",
    },
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "已確認";
      case "pending":
        return "處理中";
      case "cancelled":
        return "已取消";
      case "refunded":
        return "已退款";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-white -mt-20">
      {/* Header */}
      <section className="pt-32 pb-16 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-2">
                  訂單詳情
                </h1>
                <p className="text-gray-600 font-light">
                  訂單編號：{orderData.id}
                </p>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                  orderData.status
                )}`}
              >
                {getStatusText(orderData.status)}
              </span>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span>訂單時間：{orderData.createdAt}</span>
              <span>更新時間：{orderData.updatedAt}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* 演出資訊 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="bg-gray-50 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-light text-gray-900 mb-6">演出資訊</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-light text-gray-900 mb-2">
                  {orderData.event.artist}
                </h3>
                <p className="text-gray-600">{orderData.event.tour}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="text-gray-500">演出日期</span>
                  <p className="text-gray-900 mt-1">
                    {orderData.event.date} {orderData.event.time}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">演出場地</span>
                  <p className="text-gray-900 mt-1">{orderData.event.venue}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {orderData.event.venueAddress}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 票券詳情 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-light text-gray-900">票券詳情</h2>

            <div className="space-y-4">
              {orderData.tickets.map((ticket, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-light text-gray-900">
                        {ticket.section} {ticket.row} {ticket.seat}
                      </h3>
                      <p className="text-sm text-gray-500">
                        票券編號：{ticket.ticketNumber}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-light text-gray-900">
                        NT$ {ticket.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Link
                      href={`/tickets/${orderData.event.artist.toLowerCase()}/seats`}
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-2 border border-gray-300 text-gray-600 rounded-full text-sm font-light hover:border-gray-400 transition-colors"
                      >
                        查看座位圖
                      </motion.button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 費用明細 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gray-50 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-light text-gray-900 mb-6">費用明細</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  票價小計 ({orderData.tickets.length} 張)
                </span>
                <span>NT$ {orderData.pricing.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">手續費</span>
                <span>NT$ {orderData.pricing.fees.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-light border-t border-gray-200 pt-3">
                <span>總金額</span>
                <span>NT$ {orderData.pricing.total.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>

          {/* 購買者資訊 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                購買者資訊
              </h2>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-gray-500">姓名</span>
                  <p className="text-gray-900 mt-1">{orderData.buyer.name}</p>
                </div>
                <div>
                  <span className="text-gray-500">電子郵件</span>
                  <p className="text-gray-900 mt-1">{orderData.buyer.email}</p>
                </div>
                <div>
                  <span className="text-gray-500">手機號碼</span>
                  <p className="text-gray-900 mt-1">{orderData.buyer.phone}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                付款資訊
              </h2>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-gray-500">付款方式</span>
                  <p className="text-gray-900 mt-1">
                    {orderData.payment.method}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">卡號後四碼</span>
                  <p className="text-gray-900 mt-1">
                    **** **** **** {orderData.payment.cardLast4}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">交易編號</span>
                  <p className="text-gray-900 mt-1 font-mono text-xs">
                    {orderData.payment.transactionId}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 操作按鈕 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
              >
                聯絡客服
              </motion.button>
            </Link>
          </motion.div>

          {/* 重要提醒 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-blue-50 border border-blue-200 rounded-2xl p-6"
          >
            <h3 className="text-lg font-light text-blue-900 mb-4">入場須知</h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>• 請於演出開始前30分鐘到場，逾時將無法入場</p>
              <p>• 入場時請攜帶身分證件以供核對</p>
              <p>• 電子票券請事先下載或截圖保存</p>
              <p>• 場內禁止攝影、錄音及錄影</p>
              <p>• 如有任何問題，請聯絡客服專線 02-1234-5678</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
