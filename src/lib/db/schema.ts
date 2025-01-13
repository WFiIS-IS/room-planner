import { relations } from 'drizzle-orm';
import { int, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';
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
  scenesToElements: many(scenesToElements),
}));

export const elementPositions = sqliteTable('element_positions', {
  elementUid: text('element_uid').primaryKey(),
  x: int().notNull(),
  y: int().notNull(),
});

export const elementPositionsRelations = relations(elementPositions, ({ many }) => ({
  scenesToElements: many(scenesToElements),
}));

export const scenesToElements = sqliteTable(
  'scenes_to_elements',
  {
    elementUid: text('element_uid')
      .notNull()
      .references(() => elementPositions.elementUid),
    sceneSlug: text('scene_slug')
      .notNull()
      .references(() => scene.slug),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.elementUid, t.sceneSlug] }),
  }),
);

export const scenesToElementsRelations = relations(scenesToElements, ({ one }) => ({
  elementPosition: one(elementPositions, {
    fields: [scenesToElements.elementUid],
    references: [elementPositions.elementUid],
  }),
  scene: one(scene, {
    fields: [scenesToElements.sceneSlug],
    references: [scene.slug],
  }),
}));
