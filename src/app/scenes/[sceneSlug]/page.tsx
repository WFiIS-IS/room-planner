import 'server-only';

import Image from 'next/image';
import { notFound } from 'next/navigation';

import { deleteSceneAction } from '@/actions/scene';
import { DnD } from '@/app/DnD';
import { ImageWrapper } from '@/app/scenes/[sceneSlug]/ImageWrapper';
import { DestroyButton } from '@/components/DestroyButton';
import { PageWrapper } from '@/components/PageWrapper';
import { Text } from '@/components/ui/text';
import { getScene } from '@/data/scenes';
import { haApiClient } from '@/lib/home-assistant/client';
import { filterLights } from '@/lib/home-assistant/state';

export type ScenePageProps = {
  params: Promise<{ sceneSlug: string }>;
};

export default async function ScenesPage({ params }: ScenePageProps) {
  const { sceneSlug } = await params;
  const scene = await getScene(sceneSlug);
  const states = await haApiClient.getStates();

  if (!scene) {
    notFound();
  }

  const { width: imgWidth, height: imgHeight } = scene.imageMetadata;

  return (
    <PageWrapper>
      <form action={deleteSceneAction.bind(null, scene.slug)}>
        <DestroyButton type="submit" className="float-right" withText />
      </form>
      <DnD>
        {/*<DraggableTrey lights={filterLights(states)} />*/}
        <div className="mx-auto my-auto flex flex-col items-center gap-4">
          <Text variant="h1">{scene.title}</Text>
          {/*<PlanGrid>*/}
          <ImageWrapper imgWidth={imgWidth} imgHeight={imgHeight}>
            <Image
              src={`/image/${scene.fileMetadata.uid}.${scene.fileMetadata.ext}`}
              alt="Scene"
              fill
            />
          </ImageWrapper>
          {/*</PlanGrid>*/}
        </div>
      </DnD>
    </PageWrapper>
  );
}
