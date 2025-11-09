'use client';

import { forwardRef } from 'react';

interface ReceiptData {
  transactionId: string;
  purchaseDate: string;
  artist: string;
  tour: string;
  eventDate: string;
  venue: string;
  section: string;
  quantity: number;
  unitPrice: number;
  fees: number;
  total: number;
  paymentMethod: string;
  customerName: string;
  customerEmail: string;
}

interface ReceiptProps {
  data: ReceiptData;
  className?: string;
}

const ReceiptGenerator = forwardRef<HTMLDivElement, ReceiptProps>(
  ({ data, className = '' }, ref) => {
    return (
      <div ref={ref} className={`bg-white border border-gray-300 ${className}`}>
        {/* Receipt Header */}
        <div className="bg-gray-100 p-6 text-center border-b border-gray-300">
          <h2 className="text-2xl font-light text-gray-900 mb-2">電子收據</h2>
          <p className="text-sm text-gray-600">Superlaty K-Pop Platform</p>
          <p className="text-xs text-gray-500 mt-2">統一編號：12345678</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Transaction Info */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900 border-b border-gray-200 pb-2">交易資訊</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">收據編號</span>
                <p className="font-mono text-gray-900 mt-1">{data.transactionId}</p>
              </div>
              <div>
                <span className="text-gray-600">交易日期</span>
                <p className="text-gray-900 mt-1">{data.purchaseDate}</p>
              </div>
              <div>
                <span className="text-gray-600">付款方式</span>
                <p className="text-gray-900 mt-1">{data.paymentMethod}</p>
              </div>
              <div>
                <span className="text-gray-600">交易狀態</span>
                <p className="text-green-600 mt-1">已完成</p>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900 border-b border-gray-200 pb-2">購買人資訊</h3>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div>
                <span className="text-gray-600">姓名：</span>
                <span className="text-gray-900">{data.customerName}</span>
              </div>
              <div>
                <span className="text-gray-600">電子郵件：</span>
                <span className="text-gray-900">{data.customerEmail}</span>
              </div>
            </div>
          </div>

          {/* Event Info */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900 border-b border-gray-200 pb-2">演出資訊</h3>
            <div className="text-sm space-y-2">
              <div>
                <span className="text-gray-600">演出名稱：</span>
                <span className="text-gray-900">{data.artist} - {data.tour}</span>
              </div>
              <div>
                <span className="text-gray-600">演出日期：</span>
                <span className="text-gray-900">{data.eventDate}</span>
              </div>
              <div>
                <span className="text-gray-600">演出場地：</span>
                <span className="text-gray-900">{data.venue}</span>
              </div>
              <div>
                <span className="text-gray-600">座位區域：</span>
                <span className="text-gray-900">{data.section}</span>
              </div>
            </div>
          </div>

          {/* Itemized List */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900 border-b border-gray-200 pb-2">購買明細</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {data.section} 演出票券 × {data.quantity}
                </span>
                <span className="text-gray-900">
                  NT$ {(data.unitPrice * data.quantity).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">手續費</span>
                <span className="text-gray-900">NT$ {data.fees.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">稅額 (5%)</span>
                <span className="text-gray-900">NT$ {Math.round(data.total * 0.05).toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-300 pt-2 mt-3">
                <div className="flex justify-between font-medium">
                  <span className="text-gray-900">總計金額</span>
                  <span className="text-gray-900 text-lg">NT$ {data.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900 border-b border-gray-200 pb-2">付款詳情</h3>
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-600">授權碼</span>
                  <p className="font-mono text-gray-900 mt-1">AUTH{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
                </div>
                <div>
                  <span className="text-gray-600">商店代碼</span>
                  <p className="font-mono text-gray-900 mt-1">SUPERLATY001</p>
                </div>
                <div>
                  <span className="text-gray-600">終端機號</span>
                  <p className="font-mono text-gray-900 mt-1">TM001234</p>
                </div>
                <div>
                  <span className="text-gray-600">批次號</span>
                  <p className="font-mono text-gray-900 mt-1">B{new Date().getFullYear()}{String(new Date().getMonth() + 1).padStart(2, '0')}{String(new Date().getDate()).padStart(2, '0')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Receipt Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-300">
          <div className="text-xs text-gray-500 text-center space-y-1">
            <p>此收據為電子版本，具有法律效力</p>
            <p>如需協助請聯繫客服：support@superlaty.com | 02-1234-5678</p>
            <p className="font-mono">列印時間：{new Date().toLocaleString('zh-TW')}</p>
          </div>
        </div>

        {/* Print Styles */}
        <style jsx>{`
          @media print {
            .bg-gray-100 { background-color: #f5f5f5 !important; }
            .bg-gray-50 { background-color: #fafafa !important; }
            .border-gray-200 { border-color: #e5e5e5 !important; }
            .border-gray-300 { border-color: #d4d4d4 !important; }
            .text-gray-900 { color: #111827 !important; }
            .text-gray-600 { color: #4b5563 !important; }
            .text-gray-500 { color: #6b7280 !important; }
          }
        `}</style>
      </div>
    );
  }
);

ReceiptGenerator.displayName = 'ReceiptGenerator';

export default ReceiptGenerator;
