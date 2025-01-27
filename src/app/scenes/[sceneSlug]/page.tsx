import 'server-only';

import Image from 'next/image';
import { notFound } from 'next/navigation';

import { deleteSceneAction } from '@/actions/scene';
import { DnD } from '@/app/DnD';
import { DestroyButton } from '@/components/DestroyButton';
import { PageWrapper } from '@/components/PageWrapper';
import { Text } from '@/components/ui/text';
import { getElementsPositionsOnScene } from '@/data/elementPositions';
import { getScene } from '@/data/scenes';
import { haApiClient } from '@/lib/home-assistant/client';
import { filterLights } from '@/lib/home-assistant/state';

import { DraggableLight } from './DraggableLight';
import { DraggableTray } from './DraggableTray';
import { ImageWrapper } from './ImageWrapper';
import { SceneTarget } from './SceneTarget';

export type ScenePageProps = {
  params: Promise<{ sceneSlug: string }>;
};

export default async function ScenesPage({ params }: ScenePageProps) {
  const { sceneSlug } = await params;
  const scene = await getScene(sceneSlug);
  const states = await haApiClient.getStates();
  const positionOnScene = await getElementsPositionsOnScene({ sceneSlug });

  if (!scene) {
    notFound();
  }

  const { width: imgWidth, height: imgHeight } = scene.imageMetadata;
  const filteredLights = filterLights(states);
  const lightsWithPosition = filteredLights.map((light) => ({
    ...light,
    position: positionOnScene[light.entityId]?.position,
  }));
  const notPlacedLights = lightsWithPosition.filter((light) => !light.position);
  const placedLights = lightsWithPosition.filter((light) => light.position);

  return (
    <PageWrapper>
      <form action={deleteSceneAction.bind(null, scene.slug)}>
        <DestroyButton type="submit" className="float-right" withText />
      </form>
      <DnD>
        <DraggableTray lights={notPlacedLights} sceneSlug={sceneSlug} />
        <div className="mx-auto my-auto flex flex-col items-center gap-4">
          <Text variant="h1">{scene.title}</Text>
          <SceneTarget sceneSlug={sceneSlug}>
            {placedLights.map((light) => (
              <DraggableLight
                item={light}
                sceneSlug={sceneSlug}
                key={light.entityId}
                className="absolute"
                initialTransform={light.position}
              />
            ))}
            <ImageWrapper imgWidth={imgWidth} imgHeight={imgHeight}>
              <Image
                id="target-image"
                src={`/image/${scene.fileMetadata.uid}.${scene.fileMetadata.ext}`}
                alt="Scene"
                fill
              />
            </ImageWrapper>
          </SceneTarget>
        </div>
      </DnD>
    </PageWrapper>
  );
}
