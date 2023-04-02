import { InputHTMLAttributes } from 'react';

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  fullWidth: boolean;
}

export type InputBaseProps = Omit<Partial<InputProps>, 'ref'> 
