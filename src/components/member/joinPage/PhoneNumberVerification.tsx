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
  const [phoneNum, setPhoneNum] = useState('');
  const [phoneCode, setPhonecode] = useState('');

  //확인

  const [inputChcek, setInputCheck] = useState(false); //이거는 input의 형식이 같은지
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [passCode, setPassCode] = useState(false); //받아온 code가 맞는지

  const [errorMessage, setErrorMessage] = useState('');

  const { condition, warningMessage } = ShowErrorMessage(phoneNum, 'phone');
  const { remainingTime, timeOver, resetTimer } = useTimer(180);

  const handleRequsetcode = async (e: any) => {
    e.preventDefault();
    resetTimer();
    axios
      .post(`/api/member/smsApi`, { phone: phoneNum })
      .then(function (response) {
        console.log(response);
        setShowCodeInput(true);
        //인증하면 인증버튼 비활성화
      })
      .catch(function (error) {
        console.log(error);
      });
    // const VerificationRequest = Api.post(`/api/member/smsApi`, {
    //   phone: phoneNum,
    // })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (e) {
    //     console.log(e);
    //   });
  };

  const handleCertificationCode = async (e: any) => {
    e.preventDefault();

    const verificationData = { phone: phoneNum, code: phoneCode };
    console.log(verificationData);
    //return값이 제대로 올경우
    axios
      .post(`/api/member/smsCertificationApi`, verificationData)
      .then(function (response) {
        console.log(response);
        setPassCode(true);
        setShowCodeInput(false);
        setPhonecode('');
        setInputCheck(true);
      })
      .catch(function (error) {
        //409
        //message : 인증코드가 유효하지 않음
        setShowCodeInput(false);
        if (error.response.status === 409) {
          alert(error.response.data.message);
        }
        console.log(error.response.status);
        //인증번호가 틀릴경우의 상태도 보여줘야함
      });

    // const codeConfirmation = Api.post(
    //   `/api/member/smsCertificationApi`,
    //   bringData
    // )
    //   .then(function (response) {
    //     //핸드폰 번호 disable
    //     // 코드입력 부분 사라짐
    //     // 인증버튼 사라짐
    //     //

    //     console.log(response);
    //   })
    //   .catch(function (e) {
    //     console.log(e);
    //   });
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
        {/* 에러 시 하단바 색깔변화 확인 */}
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
          <CodeReqBtn
            size="sm"
            onClick={handleRequsetcode}
            disabled={!inputChcek || passCode}
          >
            인증
          </CodeReqBtn>
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
`;

const PhoneNumInputItem = styled(S.FormItem)`
  width: 60%;
`;

export default PhoneNumberVerification;
