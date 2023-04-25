import { NextApiRequest, NextApiResponse } from 'next';

const logoutApi = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Set-Cookie', [`accessToken=;HttpOnly; path=/; Max-Age=0;`]);
  res.status(200).json({ message: '로그아웃 되었습니다.' });
};

export default logoutApi;
