import React, { useEffect, useState } from 'react';
import * as S from '@/components/stylecomponents/memberControl.styles';

//오류 유무
// 길이 유무
// 정규식 검사
//
interface MemberInputFormProps {
  type: string;
  errorCheck: boolean;
  textLenth: number;
  value: string;
  inputData: Function;
  errorMessage: string;
  children: string;
  name: string;
}

const MemberInputForm = (
  props: React.PropsWithChildren<MemberInputFormProps>
) => {
  const {
    type,
    errorCheck,
    textLenth,
    value,
    inputData,
    errorMessage,
    children,
    name,
  } = props;

  // useEffect(() => {
  //   inputData((prev) => ({ ...prev, [name]: userInfo }));
  // }, []);

  const handleUserInfo = (e) => {
    inputData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <S.FormItemBox errorCheck={errorCheck}>
      <S.FormItemTitle errorCheck={errorCheck} textLength={textLenth}>
        {children}
      </S.FormItemTitle>
      <S.FormItem
        type={type}
        name={type}
        value={value}
        onChange={handleUserInfo}
        required
        errorCheck={errorCheck}
        textLength={textLenth}
      ></S.FormItem>
      {value.length > 0 && <span>{errorMessage}</span>}
    </S.FormItemBox>
  );
};

export default MemberInputForm;
