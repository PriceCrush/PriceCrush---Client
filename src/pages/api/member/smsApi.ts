import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const smsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const serverBaseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const SMS_API_URL = `${serverBaseURL}auth/sms`;
  const phoneNum = req.body;
  res.status(500).json({
    error: {
      status: 'error',
      errorCode: 1,
      errorMessage: '전송 오류가 발생했습니다.',
      errorGroup: 'MC-002',
    },
  });
  // res.status(200).json({ message: '인증코드 문자발송 완료!' });
  // api여기 부부이 잘못됌
  // axios
  //   .post(SMS_API_URL, phoneNum)
  //   .then((response) => {
  //     const { status, data } = response;
  //     res.status(status).json(data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     // res.status(error.response.status).send(error.response.data);
  //   });
};
export default smsApi;
