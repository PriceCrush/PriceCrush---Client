import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const findEmailApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const serverBaseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const REQUEST_SMS_URL = `${serverBaseURL}/users/find/id`;
  const userInfo = req.body;
  res.status(200).json({ email: 'test12@gmail.com' });
  // email에도 핸드폰이 들어가는데 그냥 string을 반환하는 건지  아니면 핸드폰으로 알려주는건지

  /**
   *  @decreption 백엔드분들과 오프라인으로 진행할듯함
   */
  // 이메일의 경우 get요청, 데이터는  param으로
  //   axios
  //     .get(REQUEST_SMS_URL, { userInfo })
  //     .then(function (response) {
  //       res.status(200).json(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       res.status(error.response.status).send(error.response.data);
  //     });
};

export default findEmailApi;
