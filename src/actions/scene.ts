'use server';

import { getImageDimensions, getMetadata } from '@/lib/files';
import { mainLogger } from '@/lib/logger';
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
}
