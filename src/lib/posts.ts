import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/posts');

export interface PostMetadata {
  title: string;
  description: string;
  date: string;
  image: string;
  slug: string;
  category: string;
  author: string;
}

export interface Post extends PostMetadata {
  content: string;
}

// get all post metadata
export function getAllPosts(): PostMetadata[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');

    // read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // create slug from custom slug in frontmatter or from filename
    const rawSlug = matterResult.data.slug || id;
    // convert spaces to hyphens for url-friendly slugs
    const slug = rawSlug.replace(/\s+/g, '-').toLowerCase();

    return {
      title: matterResult.data.title,
      description: matterResult.data.description || '',
      date: matterResult.data.date,
      image: matterResult.data.image || '',
      category: matterResult.data.category || '',
      author: matterResult.data.author || 'test subject: anonymous',
      slug,
    } as PostMetadata;
  });

  // sort posts by date
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// get a specific post by slug
export function getPostBySlug(slug: string): Post | null {
  const allPosts = getAllPosts();

  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    return null;
  }

  // find the original filename that corresponds to this slug
  const fileNames = fs.readdirSync(postsDirectory);
  let fullPath;

  for (const fileName of fileNames) {
    const id = fileName.replace(/\.md$/, '');
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContents);

    const fileSlug = (matterResult.data.slug || id)
      .replace(/\s+/g, '-')
      .toLowerCase();

    if (fileSlug === slug) {
      fullPath = filePath;
      break;
    }
  }

  if (!fullPath) {
    return null;
  }

  // read the file content
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    ...post,
    content: matterResult.content,
  };
}

// get all possible slugs for static generation
export function getAllPostSlugs() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
}
