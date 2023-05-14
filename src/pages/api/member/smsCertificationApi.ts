import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const smsCertificationApi = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // res.status(200).json({ message: '확인' });
  const serverBaseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const SMS_CERTIFICATION_API_URL = `${serverBaseURL}auth/sms/certification`;
  const phoneNumAndCode = req.body;

  res.status(200).json({ message: 'success' });
  // 인증번호가 틀렷을때랑 시간이 지났을때랑 다른건가>?
  // res.status(409).json({ message: '유효한 인증코드가 존재하지 않습니다' });

  // {
  //   "statusCode": 409,
  //   "message": "유효한 인증코드가 존재하지 않습니다",
  //   "error": "Conflict"
  // }

  // 인증번호 발송 api
  // 성공 시 어떤값 리턴?
  // 에러 실패 시 어떤값? 스웨그만 확인하면되나?
  // axios
  //   .post(SMS_CERTIFICATION_API_URL, phoneNumAndCode)
  //   .then((response) => {
  //     res.status(200).json(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.status(error.response.status).send(error.response.data);
  //   });
};
export default smsCertificationApi;
