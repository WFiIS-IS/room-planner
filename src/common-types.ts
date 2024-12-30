import type { FC, RefAttributes } from 'react';
import type { LucideProps } from 'lucide-react';

export type IconComponent = FC<LucideProps & RefAttributes<SVGSVGElement>>;
