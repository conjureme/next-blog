'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  getPostByIdAdmin,
  updatePost,
  type Post,
} from '@/lib/supabase/posts-supabase-client';
import Link from 'next/link';
import { Icon } from '@iconify/react';

interface AdminEditPostPageProps {
  id: string;
}

export default function AdminEditPostPage({ id }: AdminEditPostPageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [post, setPost] = useState<Post | null>(null);

  const loadPost = useCallback(async () => {
    try {
      const data = await getPostByIdAdmin(id);
      if (!data) {
        router.push('/admin');
        return;
      }
      setPost(data);
    } catch (error) {
      console.error('Error loading post:', error);
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    setSaving(true);

    try {
      await updatePost(id, {
        title: post.title,
        slug: post.slug,
        description: post.description,
        content: post.content,
        image: post.image,
        category: post.category,
        author: post.author,
        published: post.published,
      });
      router.push('/admin');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <span className='loading loading-spinner loading-lg'></span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-xl mb-4'>Post not found</p>
          <Link href='/admin' className='btn btn-primary'>
            Back to Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex items-center gap-4 mb-8'>
          <Link href='/admin' className='btn btn-ghost btn-sm'>
            <Icon icon='heroicons:arrow-left' className='w-4 h-4' />
            Back
          </Link>
          <h1 className='text-3xl font-bold'>Edit Post</h1>
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
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  required
                />
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Slug</span>
                </label>
                <input
                  type='text'
                  placeholder='custom-url-slug'
                  className='input input-bordered'
                  value={post.slug}
                  onChange={(e) => setPost({ ...post, slug: e.target.value })}
                  required
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
                  value={post.description}
                  onChange={(e) =>
                    setPost({ ...post, description: e.target.value })
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
                    value={post.category}
                    onChange={(e) =>
                      setPost({ ...post, category: e.target.value })
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
                    value={post.author}
                    onChange={(e) =>
                      setPost({ ...post, author: e.target.value })
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
                  value={post.image}
                  onChange={(e) => setPost({ ...post, image: e.target.value })}
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
                  value={post.content}
                  onChange={(e) =>
                    setPost({ ...post, content: e.target.value })
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
                  <span className='label-text'>Published</span>
                  <input
                    type='checkbox'
                    className='toggle toggle-primary'
                    checked={post.published}
                    onChange={(e) =>
                      setPost({ ...post, published: e.target.checked })
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
            <button type='submit' className='btn btn-primary' disabled={saving}>
              {saving ? (
                <>
                  <span className='loading loading-spinner loading-sm'></span>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
