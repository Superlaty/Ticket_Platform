'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'qrcode';
import Image from 'next/image';

interface QRCodeProps {
  data: string;
  size?: 'small' | 'medium' | 'large';
  includeTimestamp?: boolean;
  expirationMinutes?: number;
}

interface QRCodeData {
  originalData: string;
  timestamp: number;
  expiration: number;
  hash: string;
}

export default function QRCodeGenerator({ 
  data, 
  size = 'medium', 
  includeTimestamp = true,
  expirationMinutes = 60 
}: QRCodeProps) {
  const [qrCodeData, setQrCodeData] = useState<QRCodeData | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  // const canvasRef = useRef<HTMLCanvasElement>(null);

  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-64 h-64'
  };

  const sizePixels = {
    small: 128,
    medium: 192,
    large: 256
  };

  // 生成 QR Code 資料和圖像
  useEffect(() => {
    const generateQRData = async () => {
      const timestamp = Date.now();
      const expiration = timestamp + (expirationMinutes * 60 * 1000);
      const hash = btoa(Math.random().toString()).substring(0, 8);
      
      const qrData: QRCodeData = {
        originalData: data,
        timestamp,
        expiration,
        hash
      };
      
      // 生成包含時間戳的 QR Code 資料
      const qrContent = includeTimestamp 
        ? JSON.stringify(qrData)
        : data;
      
      try {
        // 使用真正的 QR Code 庫生成
        const qrUrl = await QRCode.toDataURL(qrContent, {
          width: sizePixels[size],
          margin: 1,
          color: {
            dark: '#111827',
            light: '#FFFFFF'
          }
        });
        
        setQrCodeUrl(qrUrl);
        setQrCodeData(qrData);
        setTimeLeft(expirationMinutes * 60);
        setIsExpired(false);
      } catch (error) {
        console.error('QR Code generation failed:', error);
      }
    };

    generateQRData();
  }, [data, expirationMinutes, includeTimestamp, size]);

  // 倒數計時
  useEffect(() => {
    if (!qrCodeData) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [qrCodeData]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
  };

  const refreshQR = async () => {
    const timestamp = Date.now();
    const expiration = timestamp + (expirationMinutes * 60 * 1000);
    const hash = btoa(Math.random().toString()).substring(0, 8);
    
    const newQrData: QRCodeData = {
      originalData: data,
      timestamp,
      expiration,
      hash
    };
    
    const qrContent = includeTimestamp 
      ? JSON.stringify(newQrData)
      : data;
    
    try {
      const qrUrl = await QRCode.toDataURL(qrContent, {
        width: sizePixels[size],
        margin: 1,
        color: {
          dark: '#111827',
          light: '#FFFFFF'
        }
      });
      
      setQrCodeUrl(qrUrl);
      setQrCodeData(newQrData);
      setTimeLeft(expirationMinutes * 60);
      setIsExpired(false);
    } catch (error) {
      console.error('QR Code refresh failed:', error);
    }
  };

  // 生成視覺化 QR Code（簡化版本）
  // const generateQRPattern = () => {
  //   if (!qrCodeData) return '';
    
  //   // 基於資料生成一個簡單的視覺模式
  //   const seed = qrCodeData.hash;
  //   let pattern = '';
    
  //   for (let row = 0; row < 25; row++) {
  //     for (let col = 0; col < 25; col++) {
  //       const index = row * 25 + col;
  //       const char = seed[index % seed.length];
  //       const shouldFill = char.charCodeAt(0) % 3 === 0;
  //       pattern += shouldFill ? '██' : '  ';
  //     }
  //     pattern += '\n';
  //   }
    
  //   return pattern;
  // };

  if (!qrCodeData) {
    return (
      <div className={`${sizeClasses[size]} bg-gray-100 rounded-2xl flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-xs text-gray-500">生成中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* QR Code Display */}
      <div className={`${sizeClasses[size]} mx-auto`}>
        {!isExpired && qrCodeUrl ? (
          <div className="bg-white p-4 rounded-2xl border-2 border-gray-200 h-full flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <Image 
                src={qrCodeUrl} 
                alt="QR Code"
                className="w-full h-auto max-w-full max-h-full object-contain"
                width={size=='small'?32:size=='medium'?48:64}
                height={size=='small'?32:size=='medium'?48:64}
              />
            </div>
            
            {includeTimestamp && (
              <div className="text-center mt-2">
                <div className={`text-xs font-medium ${
                  timeLeft < 300 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {timeLeft > 0 ? `有效時間：${formatTime(timeLeft)}` : '已過期'}
                </div>
              </div>
            )}
          </div>
        ) : isExpired ? (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl h-full flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-2xl text-red-500 mb-2">過期</div>
              <div className="text-sm text-red-700 mb-3">QR Code 已過期</div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={refreshQR}
                className="px-4 py-2 bg-red-600 text-white rounded-full text-xs font-light hover:bg-red-700 transition-colors"
              >
                重新生成
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-2xl h-full flex items-center justify-center">
            <div className="text-center p-4">
              <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-xs text-gray-500">生成中...</p>
            </div>
          </div>
        )}
      </div>

      {/* QR Code Actions */}
      {!isExpired && (
        <div className="text-center space-y-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={refreshQR}
            className="px-4 py-2 border border-gray-300 text-gray-600 rounded-full text-sm font-light hover:border-gray-400 transition-colors"
          >
            重新生成
          </motion.button>
          
          <div className="text-xs text-gray-500">
            生成時間：{new Date(qrCodeData.timestamp).toLocaleString('zh-TW')}
          </div>
        </div>
      )}

      {/* QR Code Info */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="font-medium text-gray-900 mb-2 text-sm">QR Code 資訊</h4>
        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>資料雜湊</span>
            <span className="font-mono">{qrCodeData.hash}</span>
          </div>
          <div className="flex justify-between">
            <span>有效期限</span>
            <span>{expirationMinutes} 分鐘</span>
          </div>
          <div className="flex justify-between">
            <span>到期時間</span>
            <span>{new Date(qrCodeData.expiration).toLocaleString('zh-TW')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
