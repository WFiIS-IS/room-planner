import 'server-only';

import Image from 'next/image';
import { notFound } from 'next/navigation';

import { deleteSceneAction } from '@/actions/scene';
import { DnD } from '@/app/DnD';
import { DestroyButton } from '@/components/DestroyButton';
import { PageWrapper } from '@/components/PageWrapper';
import { Text } from '@/components/ui/text';
import { getScene } from '@/data/scenes';
import { haApiClient } from '@/lib/home-assistant/client';
import { filterLights } from '@/lib/home-assistant/state';

import DraggableTrey from './DraggableTrey';
import PlanGrid from './PlanGrid';

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

  return (
    <PageWrapper>
      <form action={deleteSceneAction.bind(null, scene.slug)}>
        <DestroyButton type="submit" className="float-right" withText />
      </form>
      <DnD>
        <DraggableTrey lights={filterLights(states)} />
        <div className="mx-auto my-auto flex flex-col items-center gap-4">
          <Text variant="h1">{scene.title}</Text>
          <PlanGrid>
            <Image
              src={`/image/${scene.fileMetadata.uid}.${scene.fileMetadata.ext}`}
              alt="Scene"
              width={1000}
              height={600}
              // style={{ zIndex: -1 }}
            />
          </PlanGrid>
        </div>
      </DnD>
    </PageWrapper>
  );
}
