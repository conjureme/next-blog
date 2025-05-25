import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import BlogCard from '@/components/BlogCard';

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = Array.from(
    new Set(posts.map((post) => post.category))
  ).filter(Boolean);

  return (
    <div className='min-h-screen py-12 px-4'>
      <div className='container mx-auto max-w-6xl'>
        <div className='text-center mb-16'>
          <h1 className='text-5xl font-bold mb-6 font-spacegrotesk'>
            Test Logs
          </h1>
          <p className='text-xl opacity-80 max-w-2xl mx-auto'>
            Official documentation of PolarBruh Lab testing procedures,
            experimental results, and definitely free from any hot or
            controversial takes.
          </p>
        </div>

        {categories.length > 0 && (
          <div className='mb-12 flex flex-wrap gap-2 justify-center'>
            <button className='btn btn-sm btn-primary'>All Logs</button>
            {categories.map((category) => (
              <button key={category} className='btn btn-sm btn-outline'>
                {category}
              </button>
            ))}
          </div>
        )}

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className='text-center py-20'>
            <div className='w-32 h-32 rounded-full bg-base-300 mx-auto mb-8 flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-16 w-16 opacity-50'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
            </div>
            <h2 className='text-2xl font-bold mb-4 font-spacegrotesk'>
              No Test Logs Found
            </h2>
            <p className='opacity-80 mb-8'>
              All test logs have been [REDACTED] for your safety. Please check
              back later or contact POLaBRUH for assistance.
            </p>
            <Link href='/' className='btn btn-primary'>
              Return to Testing
            </Link>
          </div>
        )}

        {posts.length > 9 && (
          <div className='flex justify-center mt-12'>
            <div className='join'>
              <button className='join-item btn btn-disabled'>«</button>
              <button className='join-item btn btn-active'>1</button>
              <button className='join-item btn'>2</button>
              <button className='join-item btn'>3</button>
              <button className='join-item btn btn-disabled'>...</button>
              <button className='join-item btn'>»</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
