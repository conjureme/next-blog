'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { Icon } from '@iconify/react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/articles', label: 'Test Logs' },
  { href: '/about', label: 'About POLaBRU' },
];

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='navbar bg-base-200/95 backdrop-blur-sm border-b border-base-300 sticky top-0 z-50'>
      <div className='navbar-start'>
        <label
          htmlFor='drawer-toggle'
          className='btn btn-square btn-ghost lg:hidden'
        >
          <Icon icon='material-symbols-light:menu' width='24' height='24' />
        </label>
        <Link href='/' className='btn btn-ghost text-xl font-spacegrotesk'>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 rounded-full bg-primary aperture-glow'></div>
            <span>PolarBruh&apos;s Lab</span>
          </div>
        </Link>
      </div>

      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className='font-spacegrotesk'>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className='navbar-end'>
        <h1 className='font-bold text-gray-400 tracking-wider'>
          {currentTime}
        </h1>
      </div>
    </div>
  );
}
