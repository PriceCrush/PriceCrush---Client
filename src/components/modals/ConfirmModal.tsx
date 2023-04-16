import React from 'react';
import styled from 'styled-components';

// Backdrop 컴포넌트
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// ModalContent 컴포넌트
const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
  background-color: #f1c40f;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
`;

const ConfirmButton = styled(Button)`
  background-color: #27ae60;
`;

const CancelButton = styled(Button)`
  background-color: #c0392b;
`;

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

// 모달 컴포넌트
const ConfirmModal = ({
  isOpen,
  closeModal,
  onConfirm,
  onCancel,
}: ModalProps) => {
  return (
    <>
      {isOpen && (
        <Backdrop onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <p>모달 내용</p>
            <div>
              <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
              <CancelButton onClick={onCancel}>취소</CancelButton>
            </div>
          </ModalContent>
        </Backdrop>
      )}
    </>
  );
};

export default ConfirmModal;
