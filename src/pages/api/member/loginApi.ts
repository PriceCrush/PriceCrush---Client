// 만들 예정
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// 여기 부분 아예 삭제를ㅐ해륻될듯 ?
// 엑세스 토큰은그냥 리코일에 넣기?

const setExpireTime = (hour: number) => {
  return new Date(Date.now() + hour * 60 * 60 * 1000).toUTCString();
};

const LoginApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const LOGIN_API_URL = `http://ec2-13-124-196-195.ap-northeast-2.compute.amazonaws.com:3000/auth`;
  const loginData = req.body;

  axios
    .post(LOGIN_API_URL, loginData)
    .then(function (response) {
      const { user, accessToken } = response.data;
      /**
       *  @description AccessToken 만료설정(1h) 쿠키 설정
       */
      const accessTotkenExpireTime = setExpireTime(1);
      res.setHeader('Set-Cookie', [
        `accessToken=${accessToken}; HttpOnly; path=/;  expires=${accessTotkenExpireTime};`,
      ]);
      res.status(200).json(user);
    })
    .catch(function (error) {
      res.status(error.response.status).send(error.response.data);
    });
};

export default LoginApi;
