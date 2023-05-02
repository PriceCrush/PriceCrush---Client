import { NextApiRequest, NextApiResponse } from 'next';

const smsCertificationApi = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  res.status(200).json({ message: '확인' });
};
export default smsCertificationApi;
