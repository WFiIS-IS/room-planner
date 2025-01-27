import { relations } from 'drizzle-orm';
import { int, primaryKey, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
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
    references: [imageMetadata.fileMetadataUid],
  }),
}));

export const imageMetadata = sqliteTable('image_metadata', {
  fileMetadataUid: text('file_metadata_uid')
    .primaryKey()
    .references(() => fileMetadata.uid),
  width: int().notNull(),
  height: int().notNull(),
});

export const imageMetadataRelations = relations(imageMetadata, ({ one }) => ({
  fileMetadata: one(fileMetadata, {
    fields: [imageMetadata.fileMetadataUid],
    references: [fileMetadata.uid],
  }),
}));

export const scene = sqliteTable('scene', {
  slug: text().primaryKey(),
  title: text().notNull(),
  fileMetadataUid: text('file_metadata_uid')
    .notNull()
    .references(() => fileMetadata.uid),
});

export const sceneRelations = relations(scene, ({ one, many }) => ({
  fileMetadata: one(fileMetadata, {
    fields: [scene.fileMetadataUid],
    references: [fileMetadata.uid],
  }),
  imageMetadata: one(imageMetadata, {
    fields: [scene.fileMetadataUid],
    references: [imageMetadata.fileMetadataUid],
  }),
  scenesToElements: many(elementPositions),
}));

export const elementPositions = sqliteTable(
  'element_positions',
  {
    elementId: text('element_id').notNull(),
    sceneSlug: text('scene_slug')
      .notNull()
      .notNull()
      .references(() => scene.slug),
    x: real().notNull(),
    y: real().notNull(),
  },
  (table) => [primaryKey({ columns: [table.sceneSlug, table.elementId] })],
);

export const elementPositionsRelations = relations(elementPositions, ({ one }) => ({
  scene: one(scene, {
    fields: [elementPositions.sceneSlug],
    references: [scene.slug],
  }),
}));
