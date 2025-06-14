import { createServerSupabaseClient } from './server';

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

// generate static params for posts
export async function getAllPostSlugs() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
}
