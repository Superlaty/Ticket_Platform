import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import QuickQRAccess from "@/components/QuickQRAccess";
import Image from "next/image";
import Link from "next/link";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fanlights.fans'), 
  title: "Superlaty | K-Pop Universe - 演唱會票券、周邊商城、會員專屬體驗",
  description: "連接你與 K-Pop 世界的橋樑。從演唱會票券到獨家周邊，從會員專屬體驗到珍貴回憶收藏。",
  keywords: "K-Pop, 演唱會, 票券, 周邊, NewJeans, BLACKPINK, BTS, TWICE",
  authors: [{ name: "Superlaty Team" }],
  creator: "Superlaty", 
  publisher: "Superlaty",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Superlaty | K-Pop Universe",
    description: "你的 K-Pop 世界，從這裡開始。演唱會票券、獨家周邊、會員專屬體驗。",
    url: "https://superlaty.com",
    siteName: "Superlaty",
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: "logo.jpg",
        width: 800,
        height: 600,
        alt: "Superlaty Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Superlaty | K-Pop Universe", 
    description: "你的 K-Pop 世界，從這裡開始。演唱會票券、獨家周邊、會員專屬體驗。",
    creator: "@superlaty",
    images: ["logo.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large", 
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification",
  },
  icons: {
    icon: "logo.jpg",
    shortcut: "logo.jpg",
    apple: "logo.jpg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="scroll-smooth">
      <head>
        <script src="https://accounts.google.com/gsi/client" async defer />
      </head>
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        <Navigation />
        <Providers>
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
        
        {/* Quick QR Access for Tickets */}
        <QuickQRAccess />
        
        {/* Minimal Footer - Max Braun inspired */}
        <footer className="bg-gray-50 py-16 px-8 mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              <div className="grayscale contrast-100 brightness-0 md:col-span-2">
              <Link href="/" className="text-2xl font-light tracking-wide text-gray-900">
              
              <Image src="/logo2.png"  alt="Superlaty Logo" width={120} height={80} />
            </Link>   
                <p className="mt-2 text-gray-600 leading-relaxed font-light max-w-md">
                  專注於創造純粹的音樂體驗。從購票到入場，每個細節都經過精心設計。
                </p>
              </div>
              
              <div>
              
                <h4 className="font-light text-gray-900 mb-6">服務</h4>
                <ul className="space-y-3">
                  {[
                    { name: '演出票券', href: '/tickets' },
                    { name: '商城', href: '/merchandise' },
                    { name: '會員', href: '/member' }
                  ].map((item, index) => (
                    <li key={index}>
                      <a 
                        href={item.href} 
                        className="text-gray-500 hover:text-gray-900 transition-colors font-light"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-light text-gray-900 mb-6">支援</h4>
                <ul className="space-y-3">
                  {[
                    { name: '常見問題', href: '/faq' },
                    { name: '聯絡我們', href: '/contact' },
                    { name: '隱私政策', href: '/privacy' }
                  ].map((item, index) => (
                    <li key={index}>
                      <a 
                        href={item.href} 
                        className="text-gray-500 hover:text-gray-900 transition-colors font-light"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-8">
              <p className="text-gray-500 text-sm font-light">
                © 2025 Superlaty. 版權所有。
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
