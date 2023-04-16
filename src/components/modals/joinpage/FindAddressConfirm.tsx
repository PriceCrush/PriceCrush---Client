import React from 'react';
import * as S from '@/components/stylecomponents/modals/productDetails/bidConfirm.style';
import { translatePriceToKoreanWon } from '@/utils/translatePriceToKoreanWon';
import ButtonBase from '@/components/buttons/ButtonBase';
import { useModal } from '@/hooks/useModal';
import TestApi from './testApi';
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';

interface BidConfirmProps {
  bidPrice: number;
}

const handleAddress = (data) => {
  const { address, zonecode } = data;
  console.log(data);
  console.log(`우편 번호 : ${zonecode}`);
  console.log(`도로명 주소 : ${address}`);
};

const FindAddressConfirm = () => {
  return (
    <PostcodeWrapper>
      <DaumPostcode
        onComplete={handleAddress}
        className="postcode-iframe"
        style={{ width: '100%', height: '450px' }}
        autoClose
      />
    </PostcodeWrapper>
  );
};

const PostcodeWrapper = styled.div`
  > div {
  }
`;
export default FindAddressConfirm;
