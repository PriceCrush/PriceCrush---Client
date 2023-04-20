// 만들 예정
// import { NextApiRequest, NextApiResponse } from 'next'
// import axios from 'axios'

// import { User } from '@src/types'

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   const loginData = req.body

//   const response = await axios.post(
//     'http://localhost:3001/api/login',
//     loginData
//   )

//   const { user }: { user: User } = response.data

//   const token = response.headers['set-cookie']

//   res.setHeader('Set-Cookie', `token=${token}; path=/;`)
//   res.status(200).json(user)
// }
