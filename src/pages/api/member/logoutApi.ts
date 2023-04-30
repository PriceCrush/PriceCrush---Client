import { NextApiRequest, NextApiResponse } from 'next';

const logoutApi = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: '로그아웃 되었습니다.' });
};

export default logoutApi;
