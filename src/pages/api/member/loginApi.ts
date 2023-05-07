// 만들 예정
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const setExpireTime = (hour: number) => {
  return new Date(Date.now() + hour * 60 * 60 * 1000).toUTCString();
};

const LoginApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const serverBaseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const LOGIN_API_URL = `${serverBaseURL}auth`;
  const loginData = req.body;

  axios
    .post(LOGIN_API_URL, loginData)
    .then(function (response) {
      const { user, accessToken } = response.data;
      const accessTotkenExpireTime = setExpireTime(1);
      res.setHeader('Set-Cookie', [
        // HttpOnly 테스트를 위해서 임시 삭제
        // `accessToken=${accessToken}; HttpOnly; path=/;  expires=${accessTotkenExpireTime};`,
        `accessToken=${accessToken}; path=/;  expires=${accessTotkenExpireTime};`,
      ]);
      res.status(200).json({ user });
    })
    .catch(function (error) {
      console.log(error);
      res.status(error.response.status).send(error.response.data);
    });
};

export default LoginApi;
