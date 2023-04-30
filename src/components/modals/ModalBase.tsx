import React, { useEffect } from 'react';
import { useModal } from '@/hooks/useModal';
import styled from 'styled-components';
import { CgClose } from 'react-icons/cg';

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

const ModalHeader = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  color: #4b5563;
  transition: color 150ms;
  border: none;
  background-color: transparent;

  &:hover,
  &:focus {
    color: #1f2937;
    outline: none;
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
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
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
