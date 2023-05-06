import React, { ReactNode } from 'react';
import styled from 'styled-components';

type ErrorMessageModalProps = {
  title: string;
  children: React.ReactNode;
};

const CommonMessage = (props: ErrorMessageModalProps) => {
  const { title, children } = props;
  return (
    <LayOut>
      <ErrorTitle>{title}</ErrorTitle>
      <ContentBox> {children}</ContentBox>
    </LayOut>
  );
};

const LayOut = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
`;

const ErrorTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.color.DEEP_ORANGE};
  font-weight: 600;
`;

const ContentBox = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 30px;
  & p {
    text-align: center;
  }
`;

export default CommonMessage;
