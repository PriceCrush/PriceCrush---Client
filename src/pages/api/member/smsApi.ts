import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const smsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const serverBaseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const SMS_API_URL = `${serverBaseURL}auth/sms`;
  const phoneNum = req.body;

  res.status(200).json({ code: '1111' });
  // 인증번호 발송 api
  // 성공 시 핸드폰으로 코드 알려주나?
  // 성공 시 리턴값을 줬으면함
  // 에러 실패 시 어떤값?
  // axios
  //   .post(SMS_API_URL, phoneNum)
  //   .then((response) => {
  //     res.status(200).json(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.status(error.response.status).send(error.response.data);
  //   });
};
export default smsApi;
