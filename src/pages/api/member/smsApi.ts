import { NextApiRequest, NextApiResponse } from 'next';

const smsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ code: '1111' });
};
export default smsApi;
