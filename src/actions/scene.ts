'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import slugify from 'slugify';

import { checkSceneExists } from '@/data/file';
import { deleteScene, insertScene } from '@/data/scenes';
import { getImageDimensions, getMetadata, saveImage } from '@/lib/files';
import { mainLogger } from '@/lib/logger';
import { r } from '@/lib/utils';
import { ALLOWED_IMAGE_TYPES, formSchema } from '@/validation/create-scene';

export async function onSubmitCreateScene(
  prevState: { message?: string } | undefined,
  formData: FormData,
) {
  const logger = mainLogger.child({ name: 'action -> onSubmitCreateScene' });
  logger.debug(`prevState: ${JSON.stringify(prevState)}`);

  const parse = formSchema.safeParse({
    name: formData.get('name'),
    image: formData.get('image'),
  });

  if (!parse.success) {
    logger.info(`Data does not match formSchema`);
    const errors = parse.error.flatten().fieldErrors;
    logger.debug(`\t└  Errors: ${JSON.stringify(errors)}`, { errors });
    return {
      errors,
      message: undefined,
    };
  }

  const { name, image } = parse.data;

  const parseResult = await getMetadata(image);
  if (!parseResult) {
    logger.error(`Unknown file was uploaded filename=${image.name} size=${image.size}`, {
      filename: image.name,
      size: image.size,
    });
    return {
      errors: {
        image: ['Invalid file'],
      },
    };
  }
  const { metadata, bytes } = parseResult;
  if (!ALLOWED_IMAGE_TYPES.includes(metadata.contentType)) {
    logger.error(`Forbidden content type "${metadata.contentType}"`, {
      contentType: metadata.contentType,
    });
    return {
      errors: {
        image: ['Only image files are accepted'],
      },
    };
  }
  const imageDimensions = await getImageDimensions(bytes);

  logger.info(`Image metadata: ${JSON.stringify(metadata)}`, metadata);
  logger.info(`Image dimensions: ${JSON.stringify(imageDimensions)}`, imageDimensions);

  const saveResult = await saveImage({
    metadata: { ...metadata, ...imageDimensions },
    data: bytes,
  });
  logger.info(`Image saved: ${JSON.stringify(saveResult)}`, { saveResult });

  const slug = slugify(name, { lower: true });
  const sceneExists = await checkSceneExists(slug);

  if (sceneExists) {
    logger.error(`Scene with slug "${slug}" already exists`);
    return {
      errors: {
        name: ['Scene with this name already exists'],
      },
    };
  }

  const [result, error] = await r(
    insertScene([{ slug, title: name, fileMetadataUid: saveResult.metadata.uid }]),
  );

  if (error) {
    logger.error(`Failed to insert scene ${(error as Error).message}`, { error });
    return {
      message: 'Failed to insert scene',
    };
  }

  const rows = result;

  logger.info(`Scene inserted: ${JSON.stringify(rows)}`, { rows });
  const insertedScene = rows.at(0);
  if (!insertedScene) {
    logger.error(`Failed to insert scene`);
    return {
      message: 'Failed to insert scene',
    };
  }

  return redirect(`/scenes/${insertedScene.slug}`);
}

export async function deleteSceneAction(slug: string) {
  const logger = mainLogger.child({ name: 'action -> deleteScene' });
  logger.debug(`deleting scene with slug: ${slug}`);
  await deleteScene(slug);
  logger.info(`Scene deleted: ${slug}`);
  revalidatePath('/scenes');
  redirect('/scenes');
}
