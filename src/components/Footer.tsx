import Link from 'next/link';

const footerLinks = [
  { href: '/articles', label: 'Test Logs' },
  { href: '/about', label: 'About' },
  { href: '/cake', label: 'The Cake', className: 'opacity-50' },
];

export default function Footer() {
  return (
    <footer className='footer footer-center p-10 bg-base-200 text-base-content border-t border-base-300'>
      <div>
        <div className='w-12 h-12 rounded-full bg-primary aperture-glow mb-4'></div>
        <p className='font-bold font-spacegrotesk'>
          PolarBruh&apos;s Lab
          <br />
          We do what we must because we can.
        </p>
        <p className='text-sm opacity-70'>© 2025 PolarBruh&apos;s Lab</p>
      </div>
      <div>
        <div className='grid grid-flow-col gap-4'>
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`link link-hover ${link.className || ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
