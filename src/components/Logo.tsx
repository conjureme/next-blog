import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showGlow?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-32 h-32',
};

export default function Logo({
  size = 'md',
  animated = false,
  showGlow = true,
}: LogoProps) {
  const baseClasses = `rounded-full ${sizeClasses[size]}`;
  const glowClasses = showGlow ? 'aperture-glow' : '';
  const animationClasses = animated ? 'animate-pulse' : '';

  return (
    <div className='relative inline-block'>
      <div className={`relative ${sizeClasses[size]}`}>
        <Image
          src='/polar_aperture_orange.png'
          alt="PolarBruh's Lab Orange Logo"
          className={`${baseClasses} ${glowClasses} ${animationClasses} object-cover`}
          fill
          sizes={size === 'lg' ? '128px' : size === 'md' ? '48px' : '32px'}
          priority
        />
      </div>
      {animated && size === 'lg' && (
        <div className='absolute inset-0 w-32 h-32 rounded-full bg-secondary portal-blue-glow opacity-50 animate-pulse animation-delay-300'></div>
      )}
    </div>
  );
}
