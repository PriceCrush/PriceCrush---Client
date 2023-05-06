import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const findPassWordApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const serverBaseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const REQUEST_SMS_URL = `${serverBaseURL}users/find/pw`; //임시비밀번호 발급 후 문자를 전송
  const usrInfo = req.body;
  res
    .status(200)
    .json({ message: '가입된 핸드폰으로 임시비밀번호를 전송했습니다.' });

  /**
   *  @decreption 백엔드분들과 오프라인으로 진행할듯함
   */
  //   axios
  //     .put(REQUEST_SMS_URL, { usrInfo })
  //     .then(function (response) {
  //       res.status(200).json(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       res.status(error.response.status).send(error.response.data);
  //     });
};

export default findPassWordApi;
