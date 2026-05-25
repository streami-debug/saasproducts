import { sqliteTable, text, real, integer, primaryKey } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const templates = sqliteTable('templates', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  price: real('price').notNull(),
  category: text('category').notNull(),
  tier: text('tier').notNull(),
  tags: text('tags').notNull(), // JSON stringified array
  rating: real('rating').notNull(),
  reviewCount: integer('review_count').notNull(),
  downloadCount: integer('download_count').notNull(),
  creatorId: text('creator_id').notNull(),
  creatorName: text('creator_name').notNull(),
  features: text('features').notNull(), // JSON stringified array
  compatibility: text('compatibility').notNull(), // JSON stringified array
  createdAt: text('created_at').notNull(),
  previewUrl: text('preview_url')
});

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  customerId: text('customer_id').notNull(),
  customerName: text('customer_name').notNull(),
  templateId: text('template_id').notNull().references(() => templates.id),
  templateTitle: text('template_title').notNull(),
  amount: real('amount').notNull(),
  status: text('status', { enum: ['paid', 'pending', 'refunded'] }).notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull()
});

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').unique().notNull(),
  role: text('role', { enum: ['user', 'creator', 'admin'] }).notNull().default('user'),
  subscriptionTier: text('subscription_tier', { enum: ['free', 'premium'] }).notNull().default('free'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull()
});

export const creators = sqliteTable('creators', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  displayName: text('display_name').notNull(),
  bio: text('bio'),
  verified: integer('verified', { mode: 'boolean' }).notNull().default(false),
  totalEarnings: real('total_earnings').notNull().default(0),
  createdAt: text('created_at').notNull()
});
