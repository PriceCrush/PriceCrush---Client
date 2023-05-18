import ButtonBase from '@/components/buttons/ButtonBase';
import { userInfoAndCheckProps } from '@/types/memberTypes';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Api } from '@/utils/commonApi';
import * as S from '@/components/stylecomponents/memberControl.styles';
import styled from 'styled-components';
import ShowErrorMessage from '../ShowErrorMessage';
import { UserInfoErrProps } from '@/types/joinFormTypes';
import Timer from '@/components/common/useTimer';
import useTimer from '@/components/common/useTimer';

// t/f 한 state에서 관리
// api요청은 api만들어서 테스트

const PhoneNumberVerification = (props: userInfoAndCheckProps) => {
  const { handleUserInfo, passOrNot } = props;
  const serverBaseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const [phoneNum, setPhoneNum] = useState('');
  const [phoneCode, setPhonecode] = useState('');

  //확인

  const [inputChcek, setInputCheck] = useState(false); //이거는 input의 형식이 같은지
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [passCode, setPassCode] = useState(false); //받아온 code가 맞는지

  const [errorMessage, setErrorMessage] = useState('');

  const { condition, warningMessage } = ShowErrorMessage(phoneNum, 'phone');
  const { remainingTime, resetTimer } = useTimer(180);

  /**
   * @description 인증번호 전송
   */
  const handleRequsetcode = async (e: any) => {
    e.preventDefault();
    resetTimer();

    try {
      const result = await Api.post('auth/sms', { phone: phoneNum });
      console.log(result);
      setShowCodeInput(true);
      setPhonecode('');
    } catch (error: any) {
      const { status, data } = error.response;
      if (status === 500) {
        alert(data.error.errorMessage);
      }
      console.log(error);
    }
  };
  /**
   * @descript 전송한 인증번호 검증
   */

  // 여기부분 Api 변환 시 오류
  const handleCertificationCode = async (e: any) => {
    e.preventDefault();

    const verificationData = { phone: phoneNum, code: phoneCode };

    try {
      const result = await Api.post('auth/sms/certification', verificationData);
      console.log(result);
      setPassCode(true);
      setShowCodeInput(false);
      setInputCheck(true);
      alert('인증번호 확인 완료');
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 409) {
        alert(error.response.data.message);
      }
    }
  };

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
      phone: phoneNum,
    }));
  }, [phoneNum]);

  useEffect(() => {
    passOrNot((prev: UserInfoErrProps) => ({ ...prev, phone: inputChcek }));
  }, [inputChcek]);

  return (
    <S.FormItemBox>
      <S.FormItemTitle errorCheck={inputChcek} textLength={phoneNum.length}>
        핸드폰
      </S.FormItemTitle>
      <PhoneNumBox>
        <PhoneNumInputItem
          type="text"
          name="zonecode"
          value={phoneNum}
          errorCheck={false}
          disabled={passCode}
          onChange={(e) => {
            setPhoneNum(e.target.value);
          }}
          placeholder='"-"빼고 숫자만 입력'
        ></PhoneNumInputItem>
        {showCodeInput ? (
          <CodeReqBtn size="sm" onClick={handleRequsetcode}>
            재인증
          </CodeReqBtn>
        ) : (
          <>
            <CodeReqBtn
              size="sm"
              onClick={handleRequsetcode}
              disabled={!inputChcek || passCode}
            >
              인증
            </CodeReqBtn>
          </>
        )}
      </PhoneNumBox>
      {phoneNum !== '' && <span>{errorMessage}</span>}

      {showCodeInput ? (
        <PhoneNumBox>
          <PhoneNumInputItem
            type="text"
            name="zonecode"
            value={phoneCode}
            onChange={(e) => {
              setPhonecode(e.target.value);
            }}
            placeholder="인증번호입력"
          ></PhoneNumInputItem>
          <TimerBox>
            <span>{remainingTime}</span>
          </TimerBox>

          <CodeReqBtn size="sm" onClick={handleCertificationCode}>
            확인
          </CodeReqBtn>
        </PhoneNumBox>
      ) : (
        ''
      )}
    </S.FormItemBox>
  );
};

const TimerBox = styled.div`
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: ${({ theme }) => theme.color.DEEP_ORANGE};
`;

const PhoneNumBox = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const CodeReqBtn = styled(S.LoginButton)`
  margin-top: 0px;
  max-height: 43px;
  border-radius: 6px;
  font-weight: 600;
  letter-spacing: 2px;

  :disabled {
    color: ${({ theme }) => theme.color.WHITE};
    cursor: auto;
  }
`;

const PhoneNumInputItem = styled(S.FormItem)`
  width: 60%;
`;

export default PhoneNumberVerification;
