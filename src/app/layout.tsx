import type { Metadata } from 'next';
import { Roboto, Space_Grotesk } from 'next/font/google';

import './globals.css';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileDrawer from '@/components/MobileDrawer';

const roboto = Roboto({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: "PolarBruh's Lab",
  description: 'We do what we must because we can.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' data-theme='light' className={spaceGrotesk.variable}>
      <body
        className={`${roboto.className} min-h-screen bg-base-100 testing-chamber-grid`}
      >
        <div className='drawer'>
          <input id='drawer-toggle' type='checkbox' className='drawer-toggle' />

          <div className='drawer-content flex flex-col'>
            <Navbar />

            <main className='flex-1'>{children}</main>

            <Footer />
          </div>

          <MobileDrawer />
        </div>
      </body>
    </html>
  );
}
