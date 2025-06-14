import { createServerSupabaseClient } from './server';
import { createClient } from './client';

export interface PostMetadata {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  slug: string;
  category: string;
  author: string;
  published: boolean;
}

export interface Post extends PostMetadata {
  content: string;
}

// server-side get all posts function
export async function getAllPosts(): Promise<PostMetadata[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('posts')
    .select(
      'id, title, description, created_at, image, slug, category, author, published'
    )
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description || '',
    date: post.created_at,
    image: post.image || '',
    slug: post.slug,
    category: post.category || '',
    author: post.author,
    published: post.published,
  }));
}

// server-side function for getting a single post
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !data) {
    console.error('Error fetching post:', error);
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    description: data.description || '',
    date: data.created_at,
    image: data.image || '',
    slug: data.slug,
    category: data.category || '',
    author: data.author,
    content: data.content,
    published: data.published,
  };
}

// client-side function for admin to get all posts (including unpublished)
export async function getAllPostsAdmin() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data;
}

// client-side function to create a post
export async function createPost(post: Omit<Post, 'id' | 'date'>) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        title: post.title,
        slug: post.slug,
        description: post.description,
        content: post.content,
        image: post.image,
        category: post.category,
        author: post.author,
        published: post.published,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating post:', error);
    throw error;
  }

  return data;
}

// client-side function to update a post
export async function updatePost(id: string, post: Partial<Post>) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('posts')
    .update(post)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating post:', error);
    throw error;
  }

  return data;
}

// client-side function to delete a post
export async function deletePost(id: string) {
  const supabase = createClient();

  const { error } = await supabase.from('posts').delete().eq('id', id);

  if (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

// generate static params for posts
export async function getAllPostSlugs() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
}
