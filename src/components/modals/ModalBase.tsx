import React, { useEffect } from 'react';
import { useModal } from '@/hooks/useModal';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  height: fit-content;
  width: 75%;
  border-radius: 1.5rem;
  background-color: white;
  padding: 3rem;

  @media (min-width: 768px) {
    width: 50%;
  }

  @media (min-width: 1024px) {
    width: 33.333333%;
  }
`;

const ModalRealContent = styled.div`
  width: 100%;
  height: 100%;
`;

const ModalBase = () => {
  const {
    modalDataState: { isOpen, content },
    closeModal,
  } = useModal();

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <ModalBackground onClick={handleBackgroundClick}>
      <ModalContent>
        <ModalRealContent>{content}</ModalRealContent>
      </ModalContent>
    </ModalBackground>
  );
};

export default ModalBase;
