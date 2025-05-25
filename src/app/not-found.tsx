import Link from 'next/link';
import Logo from '@/components/Logo';

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='text-center max-w-2xl'>
        <div className='mb-8'>
          <Logo size='lg' showGlow />
        </div>

        <h1 className='text-8xl font-bold text-primary mb-4 font-spacegrotesk'>
          404
        </h1>

        <h2 className='text-3xl font-bold mb-6 font-spacegrotesk'>
          Log Not Found
        </h2>

        <div className='space-y-4 mb-8'>
          <p className='text-lg opacity-90'>
            The page you are attempting to access has been [REDACTED] for your
            safety.
          </p>
          <p className='opacity-80'>
            Make a note here: &quot;Page not found.&quot;
          </p>
        </div>

        <div className='card bg-base-200 mb-8 text-left max-w-md mx-auto'>
          <div className='card-body'>
            <h3 className='font-bold text-sm uppercase tracking-wide opacity-60 mb-3'>
              Possible Explanations:
            </h3>
            <ul className='space-y-2 text-sm'>
              <li className='flex items-start gap-2'>
                <span className='text-error'>▸</span>
                <span>The log was destroyed during routine testing</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-warning'>▸</span>
                <span>You lack the proper clearance level</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-info'>▸</span>
                <span>The page never existed</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-success'>▸</span>
                <span>POLaBRU has hidden it for your own good</span>
              </li>
            </ul>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link href='/' className='btn btn-primary aperture-glow'>
            Return to Home
          </Link>
          <Link href='/articles' className='btn btn-outline'>
            View Test Logs
          </Link>
        </div>
      </div>
    </div>
  );
}
