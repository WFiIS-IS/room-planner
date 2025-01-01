import bytes from 'bytes';
import { z } from 'zod';

import { isBrowser } from '@/env/common';

const MAX_FILESIZE_ALLOWED = bytes('10MB')!;
export const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp'] as const;

export const fileFieldSchema = (isBrowser ? z.instanceof(FileList) : z.any())
  .refine((files) => {
    console.log(typeof files);
    return files?.length === 1;
  }, 'Image is required')
  .refine((files) => files?.[0]?.size <= MAX_FILESIZE_ALLOWED, 'Max filesize is 10MB')
  .refine(
    (files) => ALLOWED_IMAGE_TYPES.includes(files?.[0]?.type),
    '.png, .jpeg, .jpg and .webp files are accepted',
  );

export const formSchema = z.object({
  name: z.string().min(2, { message: 'Scene name must be at least 2 characters' }),
  image: fileFieldSchema,
});
