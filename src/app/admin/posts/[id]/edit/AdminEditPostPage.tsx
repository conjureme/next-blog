'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  getPostByIdAdmin,
  updatePost,
} from '@/lib/supabase/posts-supabase-client';
import { Icon } from '@iconify/react';

export default function AdminEditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [postId, setPostId] = useState<string>('');
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

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    const { id } = await params;
    setPostId(id);

    const post = await getPostByIdAdmin(id);
    if (!post) {
      router.push('/admin');
      return;
    }

    setFormData({
      title: post.title,
      slug: post.slug,
      description: post.description,
      content: post.content,
      image: post.image,
      category: post.category,
      author: post.author,
      published: post.published,
    });
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updatePost(postId, formData);
      router.push('/admin');
    } catch (error) {
      alert('Error updating post');
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

  return (
    <div className='min-h-screen py-12 px-4'>
      <div className='container mx-auto max-w-4xl'>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-3xl font-bold'>Edit Post</h1>
          <div className='flex gap-3'>
            <Link
              href={`/articles/${formData.slug}`}
              target='_blank'
              className='btn btn-ghost'
            >
              <Icon icon='heroicons:eye' className='w-5 h-5' />
              Preview
            </Link>
            <Link href='/admin' className='btn btn-ghost'>
              <Icon icon='heroicons:arrow-left' className='w-5 h-5' />
              Back to Dashboard
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='card bg-base-100 shadow-xl'>
            <div className='card-body'>
              <h2 className='card-title mb-4'>Post Details</h2>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Title</span>
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
                  <span className='label-text'>Slug</span>
                </label>
                <input
                  type='text'
                  placeholder='post-url-slug'
                  className='input input-bordered'
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  required
                />
                <label className='label'>
                  <span className='label-text-alt'>
                    URL: /articles/{formData.slug}
                  </span>
                </label>
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Description</span>
                </label>
                <textarea
                  placeholder='Brief description of the post'
                  className='textarea textarea-bordered h-24'
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Category</span>
                  </label>
                  <select
                    className='select select-bordered'
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value=''>Select category</option>
                    <option value='gaming'>Gaming</option>
                    <option value='technology'>Technology</option>
                    <option value='music'>Music</option>
                    <option value='science'>Science</option>
                    <option value='testing'>Testing</option>
                  </select>
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
                  <span className='label-text'>Post Content (Markdown)</span>
                </label>
                <textarea
                  placeholder='Write your post content here using Markdown...'
                  className='textarea textarea-bordered h-96 font-mono text-sm'
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                />
                <label className='label'>
                  <span className='label-text-alt'>
                    Supports Markdown formatting: **bold**, *italic*, #
                    headings, etc.
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className='card bg-base-100 shadow-xl'>
            <div className='card-body'>
              <div className='flex items-center justify-between'>
                <div className='form-control'>
                  <label className='label cursor-pointer'>
                    <input
                      type='checkbox'
                      className='checkbox checkbox-primary mr-3'
                      checked={formData.published}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          published: e.target.checked,
                        })
                      }
                    />
                    <span className='label-text'>Published</span>
                  </label>
                </div>

                <div className='flex gap-3'>
                  <Link href='/admin' className='btn btn-ghost'>
                    Cancel
                  </Link>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className='loading loading-spinner loading-sm'></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Icon icon='heroicons:check' className='w-5 h-5' />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
