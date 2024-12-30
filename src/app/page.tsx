import 'server-only';

import { UnderConstruction } from '@/components/dev/UnderConstruction';
import { PageWrapper } from '@/components/PageWrapper';

export default function HomePage() {
  return (
    <PageWrapper>
      <UnderConstruction />
    </PageWrapper>
  );
}
