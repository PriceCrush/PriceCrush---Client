import axios from 'axios';
import { NextApiResponse, NextApiRequest } from 'next';

const resetPasswordApi = (req: NextApiRequest, res: NextApiResponse) => {
  const serverBaseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const RESET_PW_API_URL = `${serverBaseURL}user/find/pw`;
  const newPw = req.body;
  res.status(200).json({ message: '정상적으로 바뀜' });

  // 비밀번호 재설정할때 새로운 비밀번호를 넣어야할것 같은데 안적어져있다.
  //   axios
  //     .patch(RESET_PW_API_URL, newPw)
  //     .then((response) => {
  //       res.status(200).json(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       res.status(error.response.status).send(error.response.data);
  //     });
};

export default resetPasswordApi;
