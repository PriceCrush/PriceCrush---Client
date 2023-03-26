import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth: boolean;
}

export type InputBaseProps = Partial<InputProps>;
