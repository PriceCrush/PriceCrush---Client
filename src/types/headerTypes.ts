import { themeProp } from '@/components/stylecomponents/theme';
import { HTMLAttributes } from 'react';

interface HeaderBaseProps extends HTMLAttributes<HTMLDivElement> {
  theme: themeProp;
}

export type HeaderProps = Partial<HeaderBaseProps>;
