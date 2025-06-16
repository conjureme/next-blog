import { createServerSupabaseClient } from './server';
import { createServerSupabaseClientStatic } from './server-static';

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

// server-side get all posts function (uses cookies for potential auth)
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

// static generation function- no cookies used
export async function getAllPostsStatic(): Promise<PostMetadata[]> {
  const supabase = createServerSupabaseClientStatic();

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

// generate static params for posts - doesn't use cookies
export async function getAllPostSlugsStatic() {
  const posts = await getAllPostsStatic();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
