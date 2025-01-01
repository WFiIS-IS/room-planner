import bytes from 'bytes';
import { z } from 'zod';

const MAX_FILESIZE_ALLOWED = bytes('10MB')!;
export const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

export const fileFieldSchema = z
  .instanceof(File, { message: 'Image is required' })
  .refine((file) => file.size > 0, 'Image is required')
  .refine((file) => file.size <= MAX_FILESIZE_ALLOWED, 'Max filesize is 10MB')
  .refine(
    (file) => ALLOWED_IMAGE_TYPES.includes(file.type),
    '.png, .jpeg, .jpg and .webp files are accepted',
  );

export const formSchema = z.object({
  name: z.string().min(2, { message: 'Scene name must be at least 2 characters' }),
  image: fileFieldSchema,
});
