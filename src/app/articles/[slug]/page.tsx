import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';

import Link from 'next/link';
import Image from 'next/image';

import { notFound } from 'next/navigation';
import Markdown from 'markdown-to-jsx';

import { Icon } from '@iconify/react';

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export default async function ArticlePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className='min-h-screen py-12 px-4'>
      <div className='container mx-auto max-w-4xl'>
        <Link href='/articles' className='btn btn-ghost btn-sm gap-2 mb-8'>
          <Icon icon='ion:ios-arrow-back' width='16' height='16' />
          Back to Test Logs
        </Link>

        {/* header */}
        <header className='mb-12'>
          {post.category && (
            <div className='badge badge-primary badge-lg mb-4'>
              {post.category}
            </div>
          )}
          <h1 className='text-4xl md:text-5xl font-bold mb-6 aperture-text'>
            {post.title}
          </h1>
          <div className='flex items-center gap-6 text-sm opacity-60'>
            <time>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>•</span>
            <span>{post.author}</span>
          </div>
        </header>

        {/* image */}
        {post.image && (
          <figure className='mb-12 rounded-lg overflow-hidden relative h-48 md:h-64'>
            <Image
              src={post.image}
              alt={post.title}
              fill
              className='w-full h-64 object-cover'
              priority
              unoptimized={true}
            />
          </figure>
        )}

        {/* content */}
        <div className='prose prose-lg max-w-none mb-16'>
          <Markdown
            options={{
              overrides: {
                h1: {
                  props: {
                    className: 'font-bold',
                  },
                },
                h2: {
                  props: {
                    className: 'font-bold',
                  },
                },
                h3: {
                  props: {
                    className: 'font-bold',
                  },
                },
                code: {
                  props: {
                    className:
                      'bg-base-300 text-primary px-1 py-0.5 rounded-sm',
                  },
                },
                pre: {
                  props: {
                    className:
                      'bg-base-200 border border-base-300 p-4 rounded-lg overflow-x-auto',
                  },
                },
                blockquote: {
                  props: {
                    className: 'border-l-4 border-primary italic pl-4',
                  },
                },
                a: {
                  props: {
                    className:
                      'text-secondary hover:text-primary transition-colors',
                  },
                },
              },
            }}
          >
            {post.content}
          </Markdown>
        </div>

        {/* footer */}
        <div className='divider mb-8'></div>

        <div className='bg-base-200 rounded-lg p-8 mb-12'>
          <h3 className='text-xl font-bold mb-4'>Test Log Disclaimer</h3>
          <p className='text-sm opacity-80'>
            This test log is property of PolarBruh&apos;s Lab. Any unauthorized
            reproduction, distribution, or use of this information may result in
            immediate termination of employment and/or test subject status.
            Remember: <i>We do what we must because we can.</i>
          </p>
        </div>

        {/* navigation */}
        <div className='flex justify-between items-center'>
          <Link href='/articles' className='btn btn-outline'>
            ← All Test Logs
          </Link>
          <button className='btn btn-primary aperture-glow'>
            Report Anomaly
          </button>
        </div>
      </div>
    </article>
  );
}
