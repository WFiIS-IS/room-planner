'use client';

import { useActionState, useEffect, useState, type ChangeEvent } from 'react';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { onSubmitCreateScene } from '@/actions/scene';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { mainLogger } from '@/lib/logger';
import { ALLOWED_IMAGE_TYPES, formSchema } from '@/validation/create-scene';

const logger = mainLogger.child({ name: '<CreateSceneForm />' });

type FormSchemaType = z.infer<typeof formSchema>;

export type CreateSceneFormProps = {
  id?: string;
};

const initialValues = {
  name: '',
  image: undefined,
};

const initialState = {
  errors: {
    name: undefined,
    image: undefined,
  },
  message: undefined,
};

export function CreateSceneForm({ id }: CreateSceneFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });
  const [state, formAction] = useActionState(onSubmitCreateScene, initialState);

  useEffect(() => {
    let previewUrl: string | undefined;

    if (selectedFile) {
      previewUrl = URL.createObjectURL(selectedFile);
    }
    setFilePreview(previewUrl);

    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [selectedFile]);

  useEffect(() => {
    if (state?.errors) {
      logger.info(`Assigning form errors: ${JSON.stringify(state.errors)}`);
      Object.entries(state.errors)
        .filter(([, errors]) => Boolean(errors))
        .forEach(([formField, errors]) => {
          form.setError(formField as keyof FormSchemaType, { message: errors.join('. ') });
        });
    }
  }, [form, state?.errors]);

  const imageRef = form.register('image', {
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target?.files?.[0];
      setSelectedFile(file);
    },
  });

  return (
    <Form {...form}>
      <form
        id={id}
        action={(...args) => {
          setSelectedFile(undefined);
          console.log(args[0].get('image'));
          return formAction(...args);
        }}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scene Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Scene Image</FormLabel>
              <FormControl>
                <Input type="file" accept={ALLOWED_IMAGE_TYPES.join(', ')} {...imageRef} />
              </FormControl>
              {filePreview && (
                <Image src={filePreview} alt="File preview" width={200} height={300} />
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
