import { relations } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { v4 as uuidv4 } from 'uuid';

export const fileMetadata = sqliteTable('file_metadata', {
  uid: text()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
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
  width: int().notNull(),
  height: int().notNull(),
});

export const imageMetadataRelations = relations(imageMetadata, ({ one }) => ({
  fileMetadata: one(fileMetadata, {
    fields: [imageMetadata.fileMetadata],
    references: [fileMetadata.uid],
  }),
}));
