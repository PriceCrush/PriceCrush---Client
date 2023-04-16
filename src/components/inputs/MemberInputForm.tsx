import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as S from '@/components/stylecomponents/memberControl.styles';
import useValidation from '@/hooks/useValidation';
import ShowErrorMessage from '../memberpage/ShowErrorMessage';

// 지금 에러 부분을 표현하는 로직이 이상함 그거만 수정하면 될듯함

interface MemberInputFormProps {
  type: string;
  handleUserInfo: Function;
  passOrNot: Function;
  children: string;
  name: string;
}

const MemberInputForm = (
  props: React.PropsWithChildren<MemberInputFormProps>
) => {
  const { type, handleUserInfo, passOrNot, children, name } = props;

  const [writtenData, setWrittenData] = useState('');
  const [passedInfo, setPassedInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * @description condition : 양식에 맞는 내용인지 점검, warningMessage : 그에 맞춘 경고메세지 전달
   */
  const { condition, warningMessage } = ShowErrorMessage(writtenData, name);

  const placeHolderCollection: Record<string, string> = useMemo(() => {
    return {
      email: 'email@priceCrush.co.kr',
      password: ' 영문,숫자,특수문자 조합 8~16자',
      phone: ' "-"빼고 숫자만 입력',
      address: '(우편번호) OO특별시 OO구 OO동 OO번지 OO호 ',
      name: '이름 입력',
      nickname: '영문,숫자 조합 (4~20자) ',
    };
  }, []);

  //Lodash thorattle을 쓸지 생각중
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

  useEffect(() => {
    handleUserInfo((prev: any) => ({ ...prev, [name]: writtenData }));
  }, [writtenData]);

  useEffect(() => {
    passOrNot((prev: any) => ({ ...prev, [name]: passedInfo }));
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
      {/* {!passedInfo && <span>{errorMessage}</span>} */}
      {writtenData.length > 0 && <span>{errorMessage}</span>}
    </S.FormItemBox>
  );
};

export default MemberInputForm;
