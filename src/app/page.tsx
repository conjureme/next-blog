import Link from 'next/link';
import { getAllPosts } from '@/lib/supabase/posts-supabase-server';

import Logo from '@/components/Logo';
import BlogCard from '@/components/BlogCard';

import { Icon } from '@iconify/react';

export default async function HomePage() {
  const recentPosts = (await getAllPosts()).slice(0, 3);

  return (
    <div className='min-h-screen'>
      {/* hero */}
      <section className='hero min-h-[70vh]'>
        <div className='hero-content text-center'>
          <div className='max-w-4xl'>
            <div className='mb-8'>
              <Logo size='lg' animated showGlow />
            </div>
            <h1 className='text-5xl md:text-7xl font-bold mb-6 font-spacegrotesk'>
              Welcome to PolarBruh&apos;s Lab
            </h1>
            <p className='text-lg mb-8 opacity-80'>
              For the good of all of us, except the ones who are dead.
            </p>
            <div className='flex gap-4 justify-center'>
              <Link href='/articles' className='btn btn-primary aperture-glow'>
                View Test Logs
              </Link>
              <Link href='/about' className='btn btn-outline'>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* features */}
      <section className='py-20 px-4'>
        <div className='container mx-auto max-w-6xl'>
          <h2 className='text-4xl font-bold text-center mb-16'>
            Current Testing Initiatives
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow'>
              <div className='card-body'>
                <div className='w-16 h-16 rounded-full bg-secondary portal-blue-glow mb-4'></div>
                <h3 className='card-title'>category 1</h3>
                <p className='opacity-80'>
                  this is a short description about what the first category of
                  blog articles will cover
                </p>
              </div>
            </div>

            <div className='card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow'>
              <div className='card-body'>
                <div className='w-16 h-16 rounded-full bg-accent portal-orange-glow mb-4'></div>
                <h3 className='card-title'>category 2</h3>
                <p className='opacity-80'>
                  this is a short description about what the second category of
                  blog articles will cover
                </p>
              </div>
            </div>

            <div className='card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow'>
              <div className='card-body'>
                <div className='w-16 h-16 rounded-full bg-primary aperture-glow mb-4'></div>
                <h3 className='card-title'>category 3</h3>
                <p className='opacity-80'>
                  this is a short description about what the third category of
                  blog articles will cover
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* recent posts */}
      {recentPosts.length > 0 && (
        <section className='py-20 px-4 bg-base-200'>
          <div className='container mx-auto max-w-6xl'>
            <h2 className='text-4xl font-bold text-center mb-16'>
              Recent Test Logs
            </h2>
            <div className='grid md:grid-cols-3 gap-8'>
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} variant='compact' />
              ))}
            </div>
            <div className='text-center mt-12'>
              <Link href='/articles' className='btn btn-outline btn-primary'>
                View All Test Logs
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* a CTA */}
      <section className='py-20 px-4'>
        <div className='container mx-auto max-w-4xl text-center'>
          <h2 className='text-4xl font-bold mb-8'>
            Join Our Testing Initiative
          </h2>
          <p className='text-xl mb-8 opacity-80'>
            Become a test subject today! Benefits include exposure to
            cutting-edge commentary, potential immortality, and complimentary
            atrocious game release grief counseling.
          </p>
          <div className='alert alert-warning max-w-2xl mx-auto mb-8'>
            <Icon icon='cuida:warning-outline' width='26' height='26' />
            <span className='text-sm'>
              *PolarBruh&apos;s Lab is not responsible for any psychological
              trauma, physical harm, or dimensional displacement that may occur.
            </span>
          </div>
          <Link href='/about' className='btn btn-primary btn-lg aperture-glow'>
            Apply for Testing
          </Link>
        </div>
      </section>
    </div>
  );
}
