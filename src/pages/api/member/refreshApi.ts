// 만들 예정
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const useRefreshToken = async (req: NextApiRequest, res: NextApiResponse) => {
  const serverBaseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const NEW_ACCESSTOKEN_API_URL = `${serverBaseURL}auth/refresh`;
  const { myRefreshKey } = req.cookies;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Cookie: `myRefreshKey=${myRefreshKey}`,
    },
  };

  axios
    .post(NEW_ACCESSTOKEN_API_URL, {}, config)
    .then(function (response: any) {
      res.status(200).send(response.data);
    })
    .catch(function (error: any) {
      res.status(error.response.status).send(error.response.data);
    });
};

export default useRefreshToken;
