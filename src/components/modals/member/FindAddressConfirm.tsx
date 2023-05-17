import React, { useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useModal } from '@/hooks/useModal';
import styled from 'styled-components';
/**
 * @param handlepost 전해줄 주소넣을 함수
 * @returns 카카오 api주소값
 */

const FindAddressConfirm = (props: any) => {
  const { handlepost } = props;
  const { closeModal } = useModal();

  const handleComplete = (data: any) => {
    const { address, zonecode } = data;
    handlepost((prev: any) => ({
      ...prev,
      address: address,
      zonecode: zonecode,
    })); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    closeModal();
  };

  return (
    <PostcodeWrapper>
      <DaumPostcodeEmbed
        onComplete={handleComplete}
        style={{ width: '100%', height: '500px' }}
        autoClose
      />
    </PostcodeWrapper>
  );
};

const PostcodeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default FindAddressConfirm;
