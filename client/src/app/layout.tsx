import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
// import firebase from './firebase';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Invoicer',
  description: 'Generate invoices for your clients.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  if (typeof window !== 'undefined') {
    const analytics = getAnalytics(app);
  }

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
