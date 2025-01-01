import 'server-only';

import Image from 'next/image';
import Link from 'next/link';

import { deleteSceneAction } from '@/actions/scene';
import { DestroyButton } from '@/components/DestroyButton';
import { LinkCard } from '@/components/LinkCard';
import { PageWrapper } from '@/components/PageWrapper';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { getAllScenes } from '@/data/scenes';

export default async function ScenesPage() {
  const resultSet = await getAllScenes();
  const data = resultSet.map(({ fileMetadata: { uid, ext }, slug, title }) => ({
    imageSrc: `/image/${uid}.${ext}`,
    sceneLink: `/scenes/${slug}`,
    slug,
    title,
  }));

  return (
    <PageWrapper>
      <Button asChild>
        <Link href="/scenes/create-scene">Create Scene</Link>
      </Button>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-6">
        {data.map(({ imageSrc, sceneLink, title, slug }) => (
          <LinkCard href={sceneLink} key={sceneLink}>
            <form action={deleteSceneAction.bind(null, slug)}>
              <DestroyButton type="submit" className="absolute right-0 top-0" />
            </form>
            <Text variant="h2">{title}</Text>
            <Image src={imageSrc} alt="House Plan" height={200} width={300} />
          </LinkCard>
        ))}
      </div>
    </PageWrapper>
  );
}
