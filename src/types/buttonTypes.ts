import { themeProp } from '@/components/stylecomponents/theme';
import { ButtonHTMLAttributes } from 'react';

export type Variant = 'default' | 'success' | 'warning' | 'error' | 'disabled';
type Size = 'sm' | 'md' | 'lg' | 'xl';

/**
 * ButtonBase 컴포넌트 Props, HTMLButton 의 Props 를 상속받음
 * @type Variant {string} - 버튼의 종류를 결정
 * @type size {string} - 크기를 결정
 * @type fullWidth {boolean} 버튼이 100% width 를 가질지 결정
 */
export interface ButtonBaseProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
  size: Size;
  fullWidth: boolean;
  theme: themeProp;
}

/**
 * ButtonBaseProps interface 의 모든 Props 들을 optional 로 바꾼 type
 */
export type ButtonBaseOptionalProps = Partial<ButtonBaseProps>;
