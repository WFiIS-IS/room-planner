import { useId } from 'react';

import { CreateSceneForm } from '@/app/scenes/create-scene/CreateSceneForm';
import { PageWrapper } from '@/components/PageWrapper';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function CreateScenePage() {
  const formId = useId();

  return (
    <PageWrapper>
      <Card className="mx-auto my-auto">
        <CardHeader>
          <CardTitle>Crete new scene</CardTitle>
          <CardDescription>
            Creates a new scene with a given name and house plan as background
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <CreateSceneForm id={formId} />
        </CardContent>
        <CardFooter>
          <Button form={formId} type="submit">
            Create
          </Button>
        </CardFooter>
      </Card>
    </PageWrapper>
  );
}
