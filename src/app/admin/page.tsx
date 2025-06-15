'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import {
  getAllPostsAdmin,
  deletePost,
} from '@/lib/supabase/posts-supabase-client';
import { Icon } from '@iconify/react';

export default function AdminPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkUser();
    loadPosts();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  };

  const loadPosts = async () => {
    setLoading(true);
    const allPosts = await getAllPostsAdmin();
    setPosts(allPosts);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const handleDelete = async (id: string, title: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${title}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      alert('Error deleting post');
    }
  };

  const togglePublished = async (post: any) => {
    const { updatePost } = await import('@/lib/supabase/posts-supabase-client');
    try {
      await updatePost(post.id, { published: !post.published });
      setPosts(
        posts.map((p) =>
          p.id === post.id ? { ...p, published: !p.published } : p
        )
      );
    } catch (error) {
      alert('Error updating post');
    }
  };

  return (
    <div className='min-h-screen py-12 px-4'>
      <div className='container mx-auto max-w-7xl'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-4xl font-bold mb-2'>POLaBRU Admin</h1>
            <p className='text-base-content/70'>Logged in as: {user?.email}</p>
          </div>
          <div className='flex gap-3'>
            <Link href='/' className='btn btn-ghost'>
              <Icon icon='heroicons:home' className='w-5 h-5' />
              View Site
            </Link>
            <button onClick={handleLogout} className='btn btn-outline'>
              <Icon
                icon='heroicons:arrow-right-on-rectangle'
                className='w-5 h-5'
              />
              Logout
            </button>
          </div>
        </div>

        <div className='stats shadow mb-8 w-full'>
          <div className='stat'>
            <div className='stat-figure text-primary'>
              <Icon icon='heroicons:document-text' className='w-8 h-8' />
            </div>
            <div className='stat-title'>Total Posts</div>
            <div className='stat-value'>{posts.length}</div>
          </div>
          <div className='stat'>
            <div className='stat-figure text-secondary'>
              <Icon icon='heroicons:eye' className='w-8 h-8' />
            </div>
            <div className='stat-title'>Published</div>
            <div className='stat-value'>
              {posts.filter((p) => p.published).length}
            </div>
          </div>
          <div className='stat'>
            <div className='stat-figure text-warning'>
              <Icon icon='heroicons:pencil-square' className='w-8 h-8' />
            </div>
            <div className='stat-title'>Drafts</div>
            <div className='stat-value'>
              {posts.filter((p) => !p.published).length}
            </div>
          </div>
        </div>

        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>All Posts</h2>
          <Link href='/admin/posts/new' className='btn btn-primary'>
            <Icon icon='heroicons:plus' className='w-5 h-5' />
            New Post
          </Link>
        </div>

        {loading ? (
          <div className='flex justify-center py-12'>
            <span className='loading loading-spinner loading-lg'></span>
          </div>
        ) : posts.length === 0 ? (
          <div className='text-center py-12'>
            <div className='w-24 h-24 rounded-full bg-base-300 mx-auto mb-4 flex items-center justify-center'>
              <Icon
                icon='heroicons:document-text'
                className='w-12 h-12 opacity-50'
              />
            </div>
            <h3 className='text-xl font-bold mb-2'>No posts yet</h3>
            <p className='text-base-content/70 mb-4'>
              Create your first post to get started
            </p>
            <Link href='/admin/posts/new' className='btn btn-primary'>
              Create First Post
            </Link>
          </div>
        ) : (
          <div className='card bg-base-100 shadow-xl'>
            <div className='overflow-x-auto'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className='hover'>
                      <td>
                        <div>
                          <div className='font-bold'>{post.title}</div>
                          <div className='text-sm opacity-50'>{post.slug}</div>
                        </div>
                      </td>
                      <td>
                        {post.category && (
                          <div className='badge badge-ghost badge-sm'>
                            {post.category}
                          </div>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => togglePublished(post)}
                          className={`btn btn-xs ${
                            post.published ? 'btn-success' : 'btn-warning'
                          }`}
                        >
                          {post.published ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className='text-sm'>
                        {new Date(post.created_at).toLocaleDateString()}
                      </td>
                      <td>
                        <div className='flex gap-2'>
                          <Link
                            href={`/admin/posts/${post.id}/edit`}
                            className='btn btn-ghost btn-xs'
                          >
                            <Icon icon='heroicons:pencil' className='w-4 h-4' />
                          </Link>
                          <Link
                            href={`/articles/${post.slug}`}
                            className='btn btn-ghost btn-xs'
                            target='_blank'
                          >
                            <Icon icon='heroicons:eye' className='w-4 h-4' />
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            className='btn btn-ghost btn-xs text-error'
                          >
                            <Icon icon='heroicons:trash' className='w-4 h-4' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
