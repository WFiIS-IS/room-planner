import 'server-only';

import Image from 'next/image';
import { notFound } from 'next/navigation';

import { deleteSceneAction } from '@/actions/scene';
import { DestroyButton } from '@/components/DestroyButton';
import { PageWrapper } from '@/components/PageWrapper';
import { Text } from '@/components/ui/text';
import { getScene } from '@/data/scenes';

export type ScenePageProps = {
  params: Promise<{ sceneSlug: string }>;
};

export default async function ScenesPage({ params }: ScenePageProps) {
  const { sceneSlug } = await params;
  const scene = await getScene(sceneSlug);

  if (!scene) {
    notFound();
  }

  return (
    <PageWrapper>
      <form action={deleteSceneAction.bind(null, scene.slug)}>
        <DestroyButton type="submit" className="float-right" withText />
      </form>
      <div className="mx-auto my-auto flex flex-col items-center gap-4">
        <Text variant="h1">{scene.title}</Text>
        <Image
          src={`/image/${scene.fileMetadata.uid}.${scene.fileMetadata.ext}`}
          alt="Scene"
          width={1000}
          height={600}
        />
      </div>
    </PageWrapper>
  );
}
