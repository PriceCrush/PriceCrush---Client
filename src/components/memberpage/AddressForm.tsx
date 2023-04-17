import React from 'react';
import * as S from '@/components/stylecomponents/memberControl.styles';
import styled from 'styled-components';
import { useModal } from '@/hooks/useModal';
import FindAddressConfirm from '@/components/modals/joinpage/FindAddressConfirm';
// import TestApi from '../modals/joinpage/testApi';

//모달 베이스에서 타이틀과 종료버튼 없애도 되는지
// 모달 크기랑 사용하면 스크롤 움직임 멈추게 하는거
//    document.body.style.overflow = 'hidden';

const AddressForm = () => {
  const { openModal } = useModal();
  const handleBidButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openModal({
      title: '주소검색',
      content: <FindAddressConfirm />,
    });
  };

  return (
    <S.FormItemBox>
      <S.FormItemTitle>주소</S.FormItemTitle>
      <Test>
        <TestItem type="text" name="address" placeholder="우편번호"></TestItem>
        <button name="open" onClick={handleBidButtonClick}>
          주소검색
        </button>
      </Test>
      <S.FormItem type="text" name="address" placeholder="주소"></S.FormItem>
      <S.FormItem
        type="text"
        name="address"
        placeholder="상세주소"
      ></S.FormItem>

      {/* {!passedInfo && <span>{errorMessage}</span>} */}
      {/* {writtenData.length > 0 && <span>{errorMessage}</span>} */}
    </S.FormItemBox>
  );
};

const Test = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TestItem = styled(S.FormItem)`
  width: 40%;
`;

export default AddressForm;
