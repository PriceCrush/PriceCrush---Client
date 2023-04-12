import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as S from '@/components/stylecomponents/memberControl.styles';
import useValidation from '@/hooks/useValidation';

interface MemberInputFormProps {
  type: string;
  inputData: Function;
  children: string;
  name: string;
}

const MemberInputForm = (
  props: React.PropsWithChildren<MemberInputFormProps>
) => {
  const { type, inputData, children, name } = props;

  const [writtenData, setWrittenData] = useState('');
  const [testCheck, setTestCheck] = useState(false);
  const [testMessage, setTestMessage] = useState('');
  const writtenDataStatus = useValidation(writtenData);
  // 오류 메세지 검증은 다른에서
  //오류 메세지를 띄워주는건 다른데에서 받아오는걸로

  interface solidTextPorps {
    email: string;
    password: string;
    address: string;
    name: string;
    phone: string;
    nickname: string;
  }

  const placeHolderCollection = useMemo(() => {
    return {
      email: 'email@priceCrush.co.kr',
      password: ' 영문,숫자,특수문자 조합 8~16자',
      phone: ' "-"빼고 숫자만 입력',
      address: '(우편번호) OO특별시 OO구 OO동 OO번지 OO호 ',
      name: '이름 입력',
      nickname: '영문,숫자 조합 (4~20자) ',
    };
  }, []);
  //여기부분 분리가능할듯?
  const showErrorMessage = useCallback(() => {
    const {
      textlength,
      specialCharacters,
      includingCharacters,
      continuity,
      emailForm,
      phoneNumForm,
    } = writtenDataStatus;

    const errorCheckList = {
      email: {
        condition: !emailForm,
        errorMessage: '이메일 주소를 정확히 입력해주세요',
      },
      password: {
        condition:
          !textlength ||
          !specialCharacters ||
          !includingCharacters ||
          continuity,
        errorMessage: '영문, 숫자, 특수문자를 조합하여 입력해주세요(4~16자)',
      },
      name: {
        condition: !true,
        errorMessage: '이름은 필수사항입니다.',
      },
      phone: {
        condition: !phoneNumForm,
        errorMessage: '핸드폰번호를 정확히 입력해주세요',
      },
      address: {
        condition: !true,
        errorMessage:
          '(우편번호) (도/시) (구/군/시) (동/읍/면) (상세주소)순으로 입력해주세요 ',
      },
      nickname: {
        condition: !textlength,
        errorMessage: '최소4 ~ 최대16자까지 가능합니다.',
      },
    };
    const { condition, errorMessage } = errorCheckList[name];

    if (condition) {
      setTestMessage(errorMessage);
      setTestCheck(true);
    } else {
      setTestMessage('');
      setTestCheck(false);
    }
  }, [name, writtenDataStatus]);

  useEffect(() => {
    showErrorMessage();
  }, [showErrorMessage]);

  useEffect(() => {
    inputData((prev) => ({ ...prev, [name]: writtenData }));
  }, [writtenData]);

  return (
    <S.FormItemBox errorCheck={testCheck}>
      <S.FormItemTitle errorCheck={testCheck} textLength={writtenData.length}>
        {children}
      </S.FormItemTitle>
      <S.FormItem
        type={type}
        name={type}
        value={writtenData}
        onChange={(e) => setWrittenData(e.target.value)}
        placeholder={placeHolderCollection[`${name}`]}
        errorCheck={testCheck}
        textLength={writtenData.length}
      ></S.FormItem>
      {writtenData.length > 0 && <span>{testMessage}</span>}
    </S.FormItemBox>
  );
};

export default MemberInputForm;
