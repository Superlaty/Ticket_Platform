'use client';

import { motion } from 'framer-motion';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
}

export default function LogoutConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  userName 
}: LogoutConfirmModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full"
      >
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-xl font-light text-gray-900 mb-2">確認登出</h3>
            <p className="text-gray-600">
              {userName ? `${userName}，您確定要登出嗎？` : '您確定要登出嗎？'}
            </p>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-left">
            <h4 className="font-medium text-yellow-900 mb-2">登出後將會：</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• 清除登入狀態</li>
              <li>• 保留購物車和已儲存商品</li>
              <li>• 保留抽選登記記錄</li>
              <li>• 需要重新登入才能結帳</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 text-gray-600 rounded-full font-light hover:border-gray-400 transition-colors"
            >
              取消
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConfirm}
              className="flex-1 py-3 bg-red-600 text-white rounded-full font-light hover:bg-red-700 transition-colors"
            >
              確認登出
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
