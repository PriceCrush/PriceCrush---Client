import axios from 'axios';
import { NextApiResponse, NextApiRequest } from 'next';

const resetPasswordApi = (req: NextApiRequest, res: NextApiResponse) => {
  const serverBaseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const RESET_PW_API_URL = `${serverBaseURL}user/reset/pw`;
  const newPw = req.body;
  // res.status(200).json({ message: '비밀번호가 정상적으로 변경되었습니다' });
  // res
  //   .status(409)
  //   .json({ message: '비밀번호 변경이 정상적으로 이루어지지 않았습니다.' });

  //body에 newpw넣는다
  // axios
  //   .patch(RESET_PW_API_URL, newPw)
  //   .then((response) => {
  //     res.status(200).json(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.status(error.response.status).send(error.response.data);
  //   });
};

export default resetPasswordApi;
