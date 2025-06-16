'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Icon } from '@iconify/react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className='min-h-screen flex items-center justify-center px-4'>
        <div className='card w-full max-w-md bg-base-100 shadow-xl'>
          <div className='card-body text-center'>
            <div className='avatar placeholder mx-auto mb-4'>
              <div className='bg-success text-success-content rounded-full w-16'>
                <Icon icon='heroicons:check' className='h-8 w-8' />
              </div>
            </div>
            <h2 className='card-title text-2xl justify-center mb-4'>
              Check Your Email
            </h2>
            <p className='text-base-content/70 mb-6'>
              We've sent a login link to <strong>{email}</strong>
            </p>
            <p className='text-sm text-base-content/60'>
              Click the link in your email to access the POLaBRU admin panel.
              The link will expire in 1 hour.
            </p>
            <div className='divider'>Didn't receive it?</div>
            <button
              className='btn btn-ghost btn-sm'
              onClick={() => {
                setSuccess(false);
                setEmail('');
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='card w-full max-w-md bg-base-100 shadow-xl'>
        <div className='card-body'>
          <div className='text-center mb-6'>
            <div className='avatar placeholder mx-auto mb-4'>
              <div className='bg-primary text-primary-content rounded-full w-16 aperture-glow'></div>
            </div>
            <h1 className='card-title text-2xl font-bold justify-center'>
              POLaBRU Admin Access
            </h1>
            <p className='text-base-content/70 text-sm mt-2'>
              Sign in with your email
            </p>
          </div>

          <form onSubmit={handleLogin} className='space-y-4'>
            <div className='w-full'>
              <label className='label'>
                <span className='label-text'>Email Address</span>
              </label>
              <input
                type='email'
                placeholder='admin@polarbruhlab.com'
                className='input input-bordered w-full'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className='label'>
                <span className='label-text-alt'>
                  We'll send you a secure login link
                </span>
              </label>
            </div>

            {error && (
              <div className='alert alert-error'>
                <Icon
                  icon='heroicons:exclamation-triangle'
                  className='h-6 w-6'
                />
                <span>{error}</span>
              </div>
            )}

            <button
              type='submit'
              className='btn btn-primary btn-block'
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className='loading loading-spinner loading-sm'></span>
                  Sending login link...
                </>
              ) : (
                <>
                  <Icon icon='heroicons:paper-airplane' className='h-5 w-5' />
                  Send Login Link
                </>
              )}
            </button>
          </form>

          <div className='divider'>Security Notice</div>

          <div className='text-center'>
            <p className='text-xs text-base-content/60'>
              This system is for authorized test administrators only.
              Unauthorized access will result in immediate termination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
