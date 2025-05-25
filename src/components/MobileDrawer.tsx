import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/articles', label: 'Test Logs' },
  { href: '/about', label: 'About POLaBRU' },
];

export default function MobileDrawer() {
  return (
    <div className='drawer-side z-50'>
      <label htmlFor='drawer-toggle' className='drawer-overlay'></label>
      <ul className='menu p-4 w-80 min-h-full bg-base-200'>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className='aperture-text'>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
