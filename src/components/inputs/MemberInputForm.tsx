import React, { useCallback, useEffect, useState } from 'react';
import * as S from '@/components/stylecomponents/memberControl.styles';
import ShowErrorMessage from '../member/ShowErrorMessage';
import { UserInfoErrProps } from '@/types/joinFormTypes';
import { MemberInputFormProps } from '@/types/memberTypes';

interface placeHolderCollectionProps {
  [key: string]: string;
}

const MemberInputForm = (
  props: React.PropsWithChildren<MemberInputFormProps>
) => {
  const { type, handleUserInfo, passOrNot, children, name } = props;

  const [writtenData, setWrittenData] = useState('');
  const [passedInfo, setPassedInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * @descritpion 에러메세지를 보여주는 함수
   * @description condition : 양식에 맞는 내용인지 점검
   * @description warningMessage : 그에 맞춘 경고메세지 전달
   */
  const { condition, warningMessage } = ShowErrorMessage(writtenData, name);
  /**
   * @description name종류별 placeHolder모음
   */
  const placeHolderCollection: placeHolderCollectionProps = {
    email: 'email@priceCrush.co.kr',
    password: ' 영문,숫자,특수문자 조합 8~16자',
    phone: ' "-"빼고 숫자만 입력',
    address: '(우편번호) OO특별시 OO구 OO동 OO번지 OO호 ',
    name: '이름 입력',
    nickname: '영문,숫자 조합 (4~20자) ',
  };

  //Lodash thorattle을 쓸지 생각중
  /**
   * @description ShowErrorMessage를 통해  에러메시지와 오류여부 설정
   */
  const showErrorMessage = useCallback(() => {
    if (condition) {
      setErrorMessage(warningMessage);
      setPassedInfo(false);
    } else {
      setErrorMessage('');
      setPassedInfo(true);
    }
  }, [condition, warningMessage]);

  useEffect(() => {
    showErrorMessage();
  }, [showErrorMessage]);

  // 이부분은 다 추가하면 무한 반복되서 이렇게 나뒀습니다.
  useEffect(() => {
    handleUserInfo((prev: UserInfoErrProps) => ({
      ...prev,
      [name]: writtenData,
    }));
  }, [writtenData]);

  useEffect(() => {
    passOrNot((prev: UserInfoErrProps) => ({ ...prev, [name]: passedInfo }));
  }, [passedInfo]);

  return (
    <S.FormItemBox errorCheck={passedInfo}>
      <S.FormItemTitle errorCheck={passedInfo} textLength={writtenData.length}>
        {children}
      </S.FormItemTitle>
      <S.FormItem
        type={type}
        name={type}
        value={writtenData}
        onChange={(e) => setWrittenData(e.target.value)}
        placeholder={placeHolderCollection[`${name}`]}
        errorCheck={passedInfo}
        textLength={writtenData.length}
      ></S.FormItem>
      {writtenData.length > 0 && <span>{errorMessage}</span>}
    </S.FormItemBox>
  );
};

export default MemberInputForm;
