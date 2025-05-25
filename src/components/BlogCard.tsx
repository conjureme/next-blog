import Link from 'next/link';
import Image from 'next/image';
import { PostMetadata } from '@/lib/posts';

interface BlogCardProps {
  post: PostMetadata;
  variant?: 'default' | 'compact';
}

export default function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (variant === 'compact') {
    return (
      <article className='card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow'>
        {post.image && (
          <figure className='relative h-48 overflow-hidden'>
            <Image
              src={post.image}
              alt={post.title}
              className='h-48 w-full object-cover'
              fill
            />
          </figure>
        )}
        <div className='card-body'>
          <div className='badge badge-primary mb-2'>{post.category}</div>
          <h3 className='card-title font-spacegrotesk'>{post.title}</h3>
          <p className='opacity-80 line-clamp-3'>{post.description}</p>
          <div className='card-actions justify-between items-center mt-4'>
            <span className='text-sm opacity-60'>{formatDate(post.date)}</span>
            <Link
              href={`/articles/${post.slug}`}
              className='btn btn-sm btn-primary'
            >
              Read Log
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className='card bg-base-200 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1'>
      {post.image && (
        <figure className='relative h-48 overflow-hidden'>
          <Image
            src={post.image}
            alt={post.title}
            className='h-48 w-full object-cover'
            fill
          />
          <div className='absolute inset-0 bg-gradient-to-t from-base-300/80 to-transparent'></div>
        </figure>
      )}
      <div className='card-body'>
        {post.category && (
          <div className='badge badge-primary badge-outline mb-2'>
            {post.category}
          </div>
        )}
        <h2 className='card-title font-spacegrotesk line-clamp-2'>
          {post.title}
        </h2>
        <p className='opacity-80 line-clamp-3 flex-grow'>{post.description}</p>
        <div className='divider my-2'></div>
        <div className='card-actions justify-between items-center'>
          <time className='text-sm opacity-60'>{formatDate(post.date)}</time>
          <Link
            href={`/articles/${post.slug}`}
            className='btn btn-sm btn-primary gap-2'
          >
            Read Log
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
