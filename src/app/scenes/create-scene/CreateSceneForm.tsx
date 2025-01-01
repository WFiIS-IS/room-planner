'use client';

import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ALLOWED_IMAGE_TYPES, formSchema } from '@/validation/create-scene';

type FormSchemaType = z.infer<typeof formSchema>;

export type CreateSceneFormProps = {
  id?: string;
};

export function CreateSceneForm({ id }: CreateSceneFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);

  useEffect(() => {
    let previewUrl: string | undefined;

    if (selectedFile) {
      previewUrl = URL.createObjectURL(selectedFile);
      setFilePreview(previewUrl);
    }

    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [selectedFile]);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      image: [],
    },
  });

  const imageRef = form.register('image', {
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target?.files?.[0];
      setSelectedFile(file);
    },
  });

  const onSubmit = useCallback((values: FormSchemaType) => {
    console.log(values);
  }, []);

  return (
    <Form {...form}>
      <form id={id} onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
