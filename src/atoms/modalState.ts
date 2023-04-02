import { atom } from 'recoil';

interface ModalStateProps {
  isOpen: boolean;
  title: string;
  content: JSX.Element | string;
  callback?: () => any;
}

export const modalState = atom<ModalStateProps>({
  key: 'modalState',
  default: {
    isOpen: false,
    title: ' ',
    content: '',
  },
});
