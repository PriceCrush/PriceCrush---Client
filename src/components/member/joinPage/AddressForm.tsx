import React, { useCallback, useEffect, useState } from 'react';
import * as S from '@/components/stylecomponents/memberControl.styles';
import styled from 'styled-components';
import { useModal } from '@/hooks/useModal';
import FindAddressConfirm from '@/components/modals/member/FindAddressConfirm';
import { userInfoAndCheckProps } from '@/types/memberTypes';
// import TestApi from '../modals/joinpage/testApi';
import ButtonBase from '../../buttons/ButtonBase';
import { UserInfoErrProps } from '@/types/joinFormTypes';
import ShowErrorMessage from '../ShowErrorMessage';

const AddressForm = (props: userInfoAndCheckProps) => {
  const { handleUserInfo, passOrNot } = props;
  const { openModal } = useModal();

  const [post, setPost] = useState({
    address: '',
    zonecode: '',
    extraAddress: '',
  });
  /**
   *  @description joinForm의 address 형식을 맞추기 위해 모든 주소 정보 합친값
   */
  const [fullAddress, setFullAddress] = useState('');
  const [inputChcek, setInputCheck] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { condition, warningMessage } = ShowErrorMessage(
    post.extraAddress,
    'address'
  );
  /**
   * @description 주소 api와 연결된 모달 open
   */
  const handleBidButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openModal({
      content: <FindAddressConfirm handlepost={handlepost} />,
    });
  };

  const handlepost = (e: any) => {
    setPost(e);
  };

  //여기 lodash를 사용하는게 좋나? useEffect를 안써도 될것같아서 고민중
  /**
   * @description 우편번호, 주소, 상세주소를 합치기 위한 값
   */
  useEffect(() => {
    const { address, zonecode, extraAddress } = post;
    let fullAddress = '';
    if (address && zonecode && extraAddress) {
      fullAddress = `${zonecode} ${address} ${extraAddress}`;
    }
    setFullAddress(fullAddress);
  }, [post]);
  /**
   * @description ShowErrorMessage를 통해  에러메시지와 오류여부 설정
   */
  const showErrorMessage = useCallback(() => {
    if (condition) {
      setErrorMessage(warningMessage);
      setInputCheck(false);
    } else {
      setErrorMessage('');
      setInputCheck(true);
    }
  }, [condition, warningMessage]);

  useEffect(() => {
    showErrorMessage();
  }, [showErrorMessage]);

  useEffect(() => {
    handleUserInfo((prev: UserInfoErrProps) => ({
      ...prev,
      address: fullAddress,
    }));
  }, [fullAddress]);

  useEffect(() => {
    passOrNot((prev: UserInfoErrProps) => ({ ...prev, address: inputChcek }));
  }, [inputChcek]);

  return (
    <S.FormItemBox>
      <S.FormItemTitle errorCheck={inputChcek} textLength={post.address.length}>
        주소
      </S.FormItemTitle>
      <ZondcodeBox>
        <ZondcodeItem
          type="text"
          name="zonecode"
          value={post.zonecode}
          onChange={handlepost}
          disabled
          placeholder="우편번호"
        ></ZondcodeItem>
        <AddressBtn name="open" size="sm" onClick={handleBidButtonClick}>
          주소검색
        </AddressBtn>
      </ZondcodeBox>
      <AddressFormItem
        type="text"
        name="address"
        value={post.address}
        onChange={handlepost}
        disabled
        placeholder="주소"
      ></AddressFormItem>
      <S.FormItem
        type="text"
        name="extraAddress"
        value={post.extraAddress}
        onChange={(e) =>
          setPost((prev) => ({ ...prev, extraAddress: e.target.value }))
        }
        placeholder="상세주소"
      ></S.FormItem>
      {post.address !== '' && <span>{errorMessage}</span>}
    </S.FormItemBox>
  );
};

const ZondcodeBox = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
`;
const AddressBtn = styled(ButtonBase)`
  font-weight: 600;
  letter-spacing: 2px;
`;

const AddressFormItem = styled(S.FormItem)`
  :disabled {
    color: ${({ theme }) => theme.color.GRAY};
  }
`;

const ZondcodeItem = styled(AddressFormItem)`
  width: 40%;
`;

export default AddressForm;
