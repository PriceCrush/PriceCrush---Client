import {
  userCommonDataState,
  userPrivateDataState,
} from '@/atoms/isLoggedInState';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import * as S from '@/components/stylecomponents/myPage.style';
import styled from 'styled-components';
import ButtonBase from './../../components/buttons/ButtonBase';

// api를 만들지 안마들지에 대한 의견 교환 후 진행 할 예정
// 1. api요청 시 axios이용
// 2. api요청 안할 시 atom에서 유정 상태 session에 저장해서 보여주는걸로
const UserProfile = () => {
  const userCommonDataValue = useRecoilValue(userCommonDataState);
  const userPrivateDataValue = useRecoilValue(userPrivateDataState);

  const [userCommonData, setUserCommonData] = useState({
    email: '',
    name: '',
    nickname: '',
  });

  const [userPrivateData, setUerPrivateData] = useState({
    address: '',
    phone: '',
  });

  const { email, name, nickname } = userCommonData;
  const { address, phone } = userPrivateData;

  useEffect(() => {
    setUserCommonData(userCommonDataValue);
  }, [userCommonDataValue]);
  useEffect(() => {
    setUerPrivateData(userPrivateDataValue);
  }, [userPrivateDataValue]);

  return (
    <ProfileLayout>
      <ContentBox>
        <PageTitleBox>
          <S.PageTitle>프로필 정보</S.PageTitle>
        </PageTitleBox>
        <ProfileInfoGroupBox>
          <InfoWrapper>
            <InfoTitle>로그인정보</InfoTitle>
            <InfoBox>
              <InfoName>이메일 주소</InfoName>
              <InfoDetailBox>
                <p>{email}</p>
              </InfoDetailBox>
            </InfoBox>
            <InfoBox>
              <InfoName>비밀번호</InfoName>
              <InfoDetailBox>
                <p>password</p>
                <InfoBtn
                  size="sm"
                  onClick={() => {
                    Router.push('/member/resetPassword');
                  }}
                >
                  변경
                </InfoBtn>
              </InfoDetailBox>
            </InfoBox>
          </InfoWrapper>

          <InfoWrapper>
            <InfoTitle>개인정보</InfoTitle>
            <InfoBox>
              <InfoName>이름</InfoName>
              <InfoDetailBox>
                <p>{name}</p>
              </InfoDetailBox>
            </InfoBox>
            <InfoBox>
              <InfoName>닉네임</InfoName>
              <InfoDetailBox>
                <p>{nickname}</p>
              </InfoDetailBox>
            </InfoBox>
            <InfoBox>
              <InfoName>주소</InfoName>
              <InfoDetailBox>
                <p>{address}</p>
              </InfoDetailBox>
            </InfoBox>
            <InfoBox>
              <InfoName>핸드폰 번호</InfoName>
              <InfoDetailBox>
                <p>{phone}</p>
              </InfoDetailBox>
            </InfoBox>
          </InfoWrapper>
        </ProfileInfoGroupBox>
      </ContentBox>
    </ProfileLayout>
  );
};

const InfoTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 550;
`;

const InfoBtn = styled(ButtonBase)`
  font-weight: 550;
  padding: 10px 0;
  min-width: 50px;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 15px;
  padding-left: 11px;
  padding-right: 12px;
`;

const InfoDetailBox = styled.div`
  height: 3rem;
  display: flex;
  justify-content: space-between;
  padding-top: 6px;
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.color.GRAY};
  letter-spacing: -0.16px;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const InfoName = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 450;
`;

const InfoBox = styled.div`
  padding: 25px 0 10px 0;
  position: relative;
  border-bottom: 0.75px solid ${({ theme }) => theme.color.GRAY};
  > div {
  }
`;

const InfoWrapper = styled.div`
  padding-top: 4vh;
  min-width: 480px;
`;
const ProfileInfoGroupBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PageTitleBox = styled.div`
  padding-bottom: 3vh;
  border-bottom: 2px solid ${({ theme }) => theme.color.BLACK};
`;

const ProfileLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContentBox = styled.div`
  min-width: 600px;
  margin: 3vh auto;
`;

export default UserProfile;
