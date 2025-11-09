'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface TicketData {
  id: string;
  artist: string;
  date: string;
  time: string;
  section: string;
}

export default function QuickQRAccess() {
  const [availableTickets, setAvailableTickets] = useState<TicketData[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showQRAccess, setShowQRAccess] = useState(false);

  useEffect(() => {
    const checkAvailableTickets = () => {
      try {
        // 檢查是否有可用的 QR Code 票券
        const mockTickets: TicketData[] = [
          {
            id: 'confirmed-1',
            artist: 'NewJeans',
            date: '2025.03.15',
            time: '19:30',
            section: 'A區'
          }
        ];

        // 檢查是否為演出當日或前一日
        const today = new Date();
        const hasUpcomingShows = mockTickets.some(ticket => {
          const showDate = new Date(ticket.date);
          const daysDiff = Math.ceil((showDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          return daysDiff >= 0 && daysDiff <= 1; // 當日或前一日
        });

        if (hasUpcomingShows) {
          setAvailableTickets(mockTickets);
          setShowQRAccess(true);
        }
      } catch (error) {
        console.error('Error checking tickets:', error);
      }
    };

    checkAvailableTickets();

    const handleAuthChange = () => {
      checkAvailableTickets();
    };

    window.addEventListener('authStateChanged', handleAuthChange);

    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange);
    };
  }, []);

  if (!showQRAccess || availableTickets.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-30">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="mr-4 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 min-w-[250px]"
          >
            <div className="space-y-4">
              <div className="text-center">
                <h4 className="text-lg font-light text-gray-900 mb-2">
                  快速入場
                </h4>
                <p className="text-sm text-gray-600">
                  即將開始的演出
                </p>
              </div>
              
              <div className="space-y-3">
                {availableTickets.map(ticket => (
                  <Link key={ticket.id} href={`/tickets/digital/${ticket.id}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-purple-50 border border-purple-200 rounded-xl p-3 hover:border-purple-300 transition-colors cursor-pointer"
                    >
                      <div className="text-center">
                        <h5 className="font-medium text-purple-900">{ticket.artist}</h5>
                        <p className="text-sm text-purple-700">{ticket.date} {ticket.time}</p>
                        <p className="text-xs text-purple-600 mt-1">{ticket.section}</p>
                        <div className="mt-2 text-xs px-3 py-1 bg-purple-600 text-white rounded-full inline-block">
                          顯示 QR Code
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <Link href="/my-tickets">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 border border-gray-300 text-gray-600 rounded-full font-light text-sm hover:border-gray-400 transition-colors"
                  >
                    查看所有票券
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg"
        title="快速入場 QR Code"
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h1M6 16H5m6 4v1m6-11h1M6 6H5m6-4v1M6 6h12a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2z" />
          </svg>
        </motion.div>
      </motion.button>
    </div>
  );
}
