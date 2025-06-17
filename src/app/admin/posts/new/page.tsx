'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/lib/supabase/posts-supabase-client';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    image: '',
    category: '',
    author: 'PolarBruh',
    published: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createPost({
        ...formData,
        slug:
          formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
      });
      router.push('/admin');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex items-center gap-4 mb-8'>
          <Link href='/admin' className='btn btn-ghost btn-sm'>
            <Icon icon='heroicons:arrow-left' className='w-4 h-4' />
            Back
          </Link>
          <h1 className='text-3xl font-bold'>Create New Post</h1>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='card bg-base-100 shadow-xl'>
            <div className='card-body'>
              <h2 className='card-title mb-4'>Post Details</h2>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Title*</span>
                </label>
                <input
                  type='text'
                  placeholder='Enter post title'
                  className='input input-bordered'
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>
                    Slug (leave blank to auto-generate)
                  </span>
                </label>
                <input
                  type='text'
                  placeholder='custom-url-slug'
                  className='input input-bordered'
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                />
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Description*</span>
                </label>
                <textarea
                  placeholder='Brief description of the post'
                  className='textarea textarea-bordered'
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Category</span>
                  </label>
                  <input
                    type='text'
                    placeholder='gaming, music, etc.'
                    className='input input-bordered'
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  />
                </div>

                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Author</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Author name'
                    className='input input-bordered'
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Featured Image URL</span>
                </label>
                <input
                  type='text'
                  placeholder='/images/post-image.jpg'
                  className='input input-bordered'
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className='card bg-base-100 shadow-xl'>
            <div className='card-body'>
              <h2 className='card-title mb-4'>Content</h2>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Post Content (Markdown)*</span>
                </label>
                <textarea
                  placeholder='Write your post content in Markdown...'
                  className='textarea textarea-bordered font-mono text-sm'
                  rows={15}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>

          <div className='card bg-base-100 shadow-xl'>
            <div className='card-body'>
              <div className='form-control'>
                <label className='label cursor-pointer'>
                  <span className='label-text'>Publish immediately</span>
                  <input
                    type='checkbox'
                    className='toggle toggle-primary'
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                  />
                </label>
              </div>
            </div>
          </div>

          <div className='flex gap-4 justify-end'>
            <Link href='/admin' className='btn btn-ghost'>
              Cancel
            </Link>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className='loading loading-spinner loading-sm'></span>
                  Creating...
                </>
              ) : (
                'Create Post'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
