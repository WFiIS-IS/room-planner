import UnderConstructionIcon from '@/components/icons/construction.svg';
import { Text } from '@/components/ui/text';

const SIZE = 75;

export function UnderConstruction() {
  return (
    <span className="mb-auto ml-auto mr-auto mt-auto flex items-center gap-4">
      <UnderConstructionIcon width={SIZE} height={SIZE} />
      <Text variant="h1">WIP</Text>
      <UnderConstructionIcon width={SIZE} height={SIZE} />
    </span>
  );
}
