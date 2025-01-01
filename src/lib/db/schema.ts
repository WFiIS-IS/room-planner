import { relations } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const fileMetadata = sqliteTable('file_metadata', {
  uid: text().primaryKey(),
  contentType: text('content_type').notNull(),
  fileSize: int('file_size').notNull(),
  ext: text().notNull(),
  originalFilename: text('original_filename').notNull(),
});

export const fileMetadataRelations = relations(fileMetadata, ({ one }) => ({
  imageMetadata: one(imageMetadata, {
    fields: [fileMetadata.uid],
    references: [imageMetadata.fileMetadata],
  }),
}));

export const imageMetadata = sqliteTable('image_metadata', {
  fileMetadata: text('file_metadata')
    .primaryKey()
    .references(() => fileMetadata.uid),
  width: int(),
  height: int(),
});

export const imageMetadataRelations = relations(imageMetadata, ({ one }) => ({
  fileMetadata: one(fileMetadata, {
    fields: [imageMetadata.fileMetadata],
    references: [fileMetadata.uid],
  }),
}));
