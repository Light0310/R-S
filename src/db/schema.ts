import { pgTable, text, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const searchQueries = pgTable('search_queries', {
  id: serial('id').primaryKey(),
  queryString: text('query_string').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow()
});

export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  slug: text('slug').notNull().unique(),
  status: varchar('status', { length: 50 }).notNull().default('published'),
  description: text('description'),
  tags: text('tags').array(),
  createdAt: timestamp('created_at').defaultNow()
});
