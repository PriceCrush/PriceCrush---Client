import Router from 'next/router';
import React from 'react';
import * as S from '@/components/stylecomponents/myPage.style';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Api } from '@/utils/commonApi';

// api를 만들지 안마들지에 대한 의견 교환 후 진행 할 예정
// 1. api요청 시 axios이용
// 2. api요청 안할 시 atom에서 유정 상태 session에 저장해서 보여주는걸로
interface userDataProps {
  id: string;
  email: string;
  phone: string;
  nickname: string;
  address: string;
  name: string;
  agreement_use: boolean;
  agreement_mkt: boolean;
  favorites?: [string];
}

interface ServerSideReturn {
  userData: userDataProps;
}

const UserProfile = (props: ServerSideReturn) => {
  const { userData } = props;

  const { email, name, phone, nickname, address } = userData;

  const RESET_PASSWORD_URL = '/member/resetPassword';

  return (
    <S.ProfileLayout>
      <S.ContentBox>
        <S.PageTitleBox>
          <S.PageTitle>프로필 정보</S.PageTitle>
        </S.PageTitleBox>
        <S.ProfileInfoGroupBox>
          <S.InfoWrapper>
            <S.InfoTitle>로그인정보</S.InfoTitle>
            <S.InfoBox>
              <S.InfoName>이메일 주소</S.InfoName>
              <S.InfoDetailBox>
                <p>{email}</p>
              </S.InfoDetailBox>
            </S.InfoBox>
            <S.InfoBox>
              <S.InfoName>비밀번호</S.InfoName>
              <S.InfoDetailBox>
                <p>password</p>
                <S.InfoBtn
                  size="sm"
                  onClick={() => {
                    Router.push(`${RESET_PASSWORD_URL}`);
                  }}
                >
                  변경
                </S.InfoBtn>
              </S.InfoDetailBox>
            </S.InfoBox>
          </S.InfoWrapper>

          <S.InfoWrapper>
            <S.InfoTitle>개인정보</S.InfoTitle>
            <S.InfoBox>
              <S.InfoName>이름</S.InfoName>
              <S.InfoDetailBox>
                <p>{name}</p>
              </S.InfoDetailBox>
            </S.InfoBox>
            <S.InfoBox>
              <S.InfoName>닉네임</S.InfoName>
              <S.InfoDetailBox>
                <p>{nickname}</p>
              </S.InfoDetailBox>
            </S.InfoBox>
            <S.InfoBox>
              <S.InfoName>주소</S.InfoName>
              <S.InfoDetailBox>
                <p>{address}</p>
              </S.InfoDetailBox>
            </S.InfoBox>
            <S.InfoBox>
              <S.InfoName>핸드폰 번호</S.InfoName>
              <S.InfoDetailBox>
                <p>{phone}</p>
              </S.InfoDetailBox>
            </S.InfoBox>
          </S.InfoWrapper>
        </S.ProfileInfoGroupBox>
      </S.ContentBox>
    </S.ProfileLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { accessToken } = context.req.cookies;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const userData = await Api.get('users', config);
  return {
    props: {
      userData,
    },
  };
};

export default UserProfile;
