'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Icon } from '@iconify/react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push('/admin');
  };

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
              Authorized personnel only
            </p>
          </div>

          <form onSubmit={handleLogin} className='space-y-4'>
            <div className='w-full'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='email'
                placeholder='admin@polarbruhlab.com'
                className='input input-bordered w-full'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='w-full'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <input
                type='password'
                placeholder='••••••••'
                className='input input-bordered w-full'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
                  Authenticating...
                </>
              ) : (
                'Access POLaBRU'
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
