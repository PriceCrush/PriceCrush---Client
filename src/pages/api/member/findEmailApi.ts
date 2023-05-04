import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const findEmailApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const serverBaseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const REQUEST_SMS_URL = `${serverBaseURL}/users/find/id`;
  const userInfo = req.body;
  res.status(200).json({ email: 'test12@gmail.com' });
  /**
   *  @decreption 백엔드분들과 오프라인으로 진행할듯함
   */
  //   axios
  //     .post(REQUEST_SMS_URL, { userInfo })
  //     .then(function (response) {
  //       res.status(200).json(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       res.status(error.response.status).send(error.response.data);
  //     });
};

export default findEmailApi;
