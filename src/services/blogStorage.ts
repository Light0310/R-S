import fs from 'fs';
import path from 'path';
import { pool } from '../controllers/seoController';

export interface BlogPostItem {
  id?: number | string;
  title: string;
  slug: string;
  content: string;
  description: string;
  tags: string[];
  author?: string;
  date?: string;
  status: 'published' | 'draft';
  created_at: string;
}

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog', 'en');
const DYNAMIC_JSON_PATH = path.join(process.cwd(), 'src', 'content', 'dynamic_posts.json');

// Ensure directory exists
function ensureDirectories() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
  const contentDir = path.join(process.cwd(), 'src', 'content');
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
}

// Helper to format YAML frontmatter + markdown
export function formatMarkdownWithFrontmatter(post: {
  title: string;
  date: string;
  author: string;
  tags: string[];
  description: string;
  content: string;
  coverImage?: string;
}): string {
  const cleanTitle = post.title.replace(/"/g, '\\"');
  const cleanDesc = post.description.replace(/"/g, '\\"');
  const tagsFormatted = JSON.stringify(post.tags || ['iptv', 'streaming']);
  const cover = post.coverImage || '/redstream_blog_cover.svg';

  return `---
title: "${cleanTitle}"
date: "${post.date}"
author: "${post.author || 'RedStream Expert'}"
tags: ${tagsFormatted}
description: "${cleanDesc}"
coverImage: "${cover}"
---

${post.content.trim()}
`;
}

// Parse markdown file content into structured object
export function parseMarkdownFile(rawContent: string, slug: string, mtime?: Date): BlogPostItem {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = rawContent.match(frontmatterRegex);

  const defaultDate = mtime ? mtime.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
  
  if (!match) {
    return {
      id: slug,
      title: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      slug,
      content: rawContent,
      description: '',
      tags: ['iptv', 'guide'],
      author: 'RedStream Expert',
      date: defaultDate,
      status: 'published',
      created_at: mtime ? mtime.toISOString() : new Date().toISOString()
    };
  }

  const yamlBlock = match[1];
  const content = match[2].trim();

  let title = 'Untitled Guide';
  let date = defaultDate;
  let author = 'RedStream Expert';
  let description = '';
  let tags: string[] = ['iptv'];

  yamlBlock.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      let val = line.slice(colonIndex + 1).trim();

      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }

      if (key === 'title') title = val;
      if (key === 'date') date = val;
      if (key === 'author') author = val;
      if (key === 'description') description = val;
      if (key === 'tags') {
        try {
          if (val.startsWith('[') && val.endsWith(']')) {
            tags = JSON.parse(val);
          } else {
            tags = val.split(',').map(t => t.trim().replace(/['"]/g, '')).filter(Boolean);
          }
        } catch {
          tags = val.replace(/[\[\]"]/g, '').split(',').map(t => t.trim()).filter(Boolean);
        }
      }
    }
  });

  return {
    id: slug,
    title,
    slug,
    content,
    description,
    tags,
    author,
    date,
    status: 'published',
    created_at: mtime ? mtime.toISOString() : new Date(date).toISOString()
  };
}

// Read all posts stored in dynamic JSON file
function readDynamicJson(): BlogPostItem[] {
  try {
    if (fs.existsSync(DYNAMIC_JSON_PATH)) {
      const data = fs.readFileSync(DYNAMIC_JSON_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('[BlogStorage] Error reading dynamic JSON:', err);
  }
  return [];
}

// Write to dynamic JSON file
function writeDynamicJson(posts: BlogPostItem[]) {
  try {
    ensureDirectories();
    fs.writeFileSync(DYNAMIC_JSON_PATH, JSON.stringify(posts, null, 2), 'utf-8');
  } catch (err) {
    console.error('[BlogStorage] Error writing dynamic JSON:', err);
  }
}

/**
 * Get all blog posts by merging:
 * 1. Disk Markdown files from src/content/blog/en/*.md
 * 2. Dynamic JSON file (src/content/dynamic_posts.json)
 * 3. PostgreSQL database (if connected)
 */
export async function getAllBlogPosts(): Promise<BlogPostItem[]> {
  ensureDirectories();
  const postsMap = new Map<string, BlogPostItem>();

  // 1. Load from Disk Markdown files
  try {
    if (fs.existsSync(BLOG_DIR)) {
      const files = fs.readdirSync(BLOG_DIR);
      for (const file of files) {
        if (file.endsWith('.md')) {
          const slug = file.replace('.md', '');
          const filePath = path.join(BLOG_DIR, file);
          const raw = fs.readFileSync(filePath, 'utf-8');
          const stats = fs.statSync(filePath);
          const post = parseMarkdownFile(raw, slug, stats.mtime);
          postsMap.set(slug, post);
        }
      }
    }
  } catch (err) {
    console.error('[BlogStorage] Error reading disk markdown files:', err);
  }

  // 2. Load from Dynamic JSON
  const jsonPosts = readDynamicJson();
  for (const post of jsonPosts) {
    if (!postsMap.has(post.slug)) {
      postsMap.set(post.slug, post);
    }
  }

  // 3. Load from PostgreSQL if available
  if (process.env.SQL_HOST) {
    try {
      const client = await pool.connect();
      try {
        const res = await client.query(`
          SELECT id, title, content, slug, status, description, tags, created_at
          FROM blog_posts
          ORDER BY created_at DESC
        `);
        for (const row of res.rows) {
          const existing = postsMap.get(row.slug);
          if (!existing) {
            postsMap.set(row.slug, {
              id: row.id,
              title: row.title,
              slug: row.slug,
              content: row.content,
              description: row.description || '',
              tags: Array.isArray(row.tags) ? row.tags : (row.tags ? [row.tags] : ['iptv']),
              author: 'RedStream Expert',
              date: new Date(row.created_at).toISOString().split('T')[0],
              status: row.status || 'published',
              created_at: new Date(row.created_at).toISOString()
            });
          } else if (existing && !existing.id) {
            existing.id = row.id;
          }
        }
      } finally {
        client.release();
      }
    } catch (dbErr: any) {
      console.warn('[BlogStorage] Database query warning (using disk storage):', dbErr.message);
    }
  }

  const allPosts = Array.from(postsMap.values());
  // Sort by date descending
  return allPosts.sort((a, b) => new Date(b.created_at || b.date || 0).getTime() - new Date(a.created_at || a.date || 0).getTime());
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPostItem | null> {
  const all = await getAllBlogPosts();
  return all.find(p => p.slug === slug) || null;
}

/**
 * Save / Create a new blog post permanently across all layers:
 * 1. Write Markdown file to src/content/blog/en/${slug}.md
 * 2. Write to src/content/dynamic_posts.json
 * 3. Save to PostgreSQL if connected
 */
export async function saveBlogPost(post: {
  title: string;
  slug: string;
  content: string;
  description: string;
  tags: string[];
  author?: string;
  date?: string;
  status?: 'published' | 'draft';
}): Promise<BlogPostItem> {
  ensureDirectories();
  const date = post.date || new Date().toISOString().split('T')[0];
  const author = post.author || 'RedStream Expert';
  const status = post.status || 'published';
  const cleanSlug = post.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const fullPost: BlogPostItem = {
    id: cleanSlug,
    title: post.title,
    slug: cleanSlug,
    content: post.content,
    description: post.description,
    tags: post.tags || ['iptv'],
    author,
    date,
    status,
    created_at: new Date().toISOString()
  };

  // 1. Write to Disk Markdown File
  try {
    const mdContent = formatMarkdownWithFrontmatter({
      title: fullPost.title,
      date: fullPost.date!,
      author: fullPost.author!,
      tags: fullPost.tags,
      description: fullPost.description,
      content: fullPost.content
    });
    const filePath = path.join(BLOG_DIR, `${cleanSlug}.md`);
    fs.writeFileSync(filePath, mdContent, 'utf-8');
    console.log(`[BlogStorage] Saved markdown file to: ${filePath}`);
  } catch (err: any) {
    console.error('[BlogStorage] Failed to save markdown file:', err.message);
  }

  // 2. Update Dynamic JSON
  try {
    const currentJson = readDynamicJson().filter(p => p.slug !== cleanSlug);
    currentJson.unshift(fullPost);
    writeDynamicJson(currentJson);
  } catch (err: any) {
    console.error('[BlogStorage] Failed to save to dynamic JSON:', err.message);
  }

  // 3. Save to PostgreSQL if connected
  if (process.env.SQL_HOST) {
    try {
      const client = await pool.connect();
      try {
        const insertRes = await client.query(`
          INSERT INTO blog_posts (title, content, slug, status, description, tags)
          VALUES ($1, $2, $3, $4, $5, $6)
          ON CONFLICT (slug) DO UPDATE 
          SET title = EXCLUDED.title, content = EXCLUDED.content, description = EXCLUDED.description, tags = EXCLUDED.tags, status = EXCLUDED.status
          RETURNING id, title, slug, status, created_at
        `, [
          fullPost.title,
          fullPost.content,
          fullPost.slug,
          fullPost.status,
          fullPost.description,
          fullPost.tags
        ]);
        if (insertRes.rows.length > 0) {
          fullPost.id = insertRes.rows[0].id;
        }
      } finally {
        client.release();
      }
    } catch (dbErr: any) {
      console.warn('[BlogStorage] Database insert warning (persisted to disk successfully):', dbErr.message);
    }
  }

  return fullPost;
}

/**
 * Update an existing blog post
 */
export async function updateBlogPost(
  idOrSlug: string | number,
  updates: {
    title: string;
    slug: string;
    content: string;
    description: string;
    tags: string[];
    status?: 'published' | 'draft';
  }
): Promise<BlogPostItem | null> {
  ensureDirectories();
  const all = await getAllBlogPosts();
  const existing = all.find(p => p.id == idOrSlug || p.slug === String(idOrSlug));
  
  if (!existing) {
    // If not found, save as new
    return saveBlogPost(updates);
  }

  const oldSlug = existing.slug;
  const newSlug = updates.slug ? updates.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : oldSlug;

  existing.title = updates.title || existing.title;
  existing.slug = newSlug;
  existing.content = updates.content || existing.content;
  existing.description = updates.description !== undefined ? updates.description : existing.description;
  existing.tags = updates.tags || existing.tags;
  if (updates.status) existing.status = updates.status;

  // 1. Handle Markdown file
  try {
    const oldFilePath = path.join(BLOG_DIR, `${oldSlug}.md`);
    const newFilePath = path.join(BLOG_DIR, `${newSlug}.md`);

    if (oldSlug !== newSlug && fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
    }

    const mdContent = formatMarkdownWithFrontmatter({
      title: existing.title,
      date: existing.date || new Date().toISOString().split('T')[0],
      author: existing.author || 'RedStream Expert',
      tags: existing.tags,
      description: existing.description,
      content: existing.content
    });
    fs.writeFileSync(newFilePath, mdContent, 'utf-8');
  } catch (err: any) {
    console.error('[BlogStorage] Error updating markdown file:', err.message);
  }

  // 2. Update Dynamic JSON
  try {
    const jsonList = readDynamicJson().filter(p => p.slug !== oldSlug && p.slug !== newSlug);
    jsonList.unshift(existing);
    writeDynamicJson(jsonList);
  } catch (err: any) {
    console.error('[BlogStorage] Error updating JSON:', err.message);
  }

  // 3. Update PostgreSQL
  if (process.env.SQL_HOST) {
    try {
      const client = await pool.connect();
      try {
        await client.query(`
          UPDATE blog_posts
          SET title = $1, content = $2, slug = $3, description = $4, tags = $5, status = $6
          WHERE id = $7 OR slug = $8
        `, [
          existing.title,
          existing.content,
          existing.slug,
          existing.description,
          existing.tags,
          existing.status,
          isNaN(Number(idOrSlug)) ? -1 : Number(idOrSlug),
          oldSlug
        ]);
      } finally {
        client.release();
      }
    } catch (dbErr: any) {
      console.warn('[BlogStorage] Database update warning:', dbErr.message);
    }
  }

  return existing;
}

/**
 * Delete a blog post
 */
export async function deleteBlogPost(idOrSlug: string | number): Promise<boolean> {
  ensureDirectories();
  const all = await getAllBlogPosts();
  const post = all.find(p => p.id == idOrSlug || p.slug === String(idOrSlug));
  
  if (!post) {
    return false;
  }

  const slug = post.slug;

  // 1. Delete Markdown file
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.md`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`[BlogStorage] Deleted file: ${filePath}`);
    }
  } catch (err: any) {
    console.error('[BlogStorage] Error deleting markdown file:', err.message);
  }

  // 2. Delete from Dynamic JSON
  try {
    const jsonList = readDynamicJson().filter(p => p.slug !== slug);
    writeDynamicJson(jsonList);
  } catch (err: any) {
    console.error('[BlogStorage] Error updating JSON on delete:', err.message);
  }

  // 3. Delete from PostgreSQL
  if (process.env.SQL_HOST) {
    try {
      const client = await pool.connect();
      try {
        await client.query(`
          DELETE FROM blog_posts
          WHERE id = $1 OR slug = $2
        `, [isNaN(Number(idOrSlug)) ? -1 : Number(idOrSlug), slug]);
      } finally {
        client.release();
      }
    } catch (dbErr: any) {
      console.warn('[BlogStorage] Database delete warning:', dbErr.message);
    }
  }

  return true;
}
