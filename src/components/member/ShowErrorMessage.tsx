import useValidation from '@/hooks/useValidation';
import React from 'react';
/**
 * @description errorCheckList인터페이스
 */
interface ErrorCheckList {
  [key: string]: {
    condition: boolean;
    warningMessage: string;
  };
}
/**
 *
 * @param writtenData  writtenData: memberInputForm에서 input값에 집어넣은 값,
 * @param name  name : memberInputForm에서 props로 받은 name
 * @returns condition : name의 종류에 따른 조건 , errorMessage:  name의 종류에 따른 조건에 맞춘 에러메세지
 */

const ShowErrorMessage = (writtenData: string, name: string) => {
  const writtenDataStatus = useValidation(writtenData);
  const {
    textlength,
    specialCharacters,
    includingCharacters,
    continuity,
    emailForm,
    phoneNumForm,
  } = writtenDataStatus;

  const errorCheckList: ErrorCheckList = {
    email: {
      condition: !emailForm,
      warningMessage: '이메일 주소를 정확히 입력해주세요',
    },
    password: {
      condition:
        !textlength || !specialCharacters || !includingCharacters || continuity,
      warningMessage:
        '영문, 숫자, 특수문자,연속되지 않는 문자를 조합하여 입력해주세요(4~16자)',
    },
    name: {
      condition: writtenData.length <= 0,
      warningMessage: '이름은 필수사항입니다.',
    },
    phone: {
      condition: !phoneNumForm,
      warningMessage: '핸드폰번호를 정확히 입력해주세요',
    },
    address: {
      condition: writtenData.length <= 0,
      warningMessage: '주소는 필수사항입니다.',
    },
    nickname: {
      condition: !textlength,
      warningMessage: '최소4 ~ 최대16자까지 가능합니다.',
    },
  };
  const { condition, warningMessage } = errorCheckList[name];

  return {
    condition,
    warningMessage,
  };
};

export default ShowErrorMessage;
