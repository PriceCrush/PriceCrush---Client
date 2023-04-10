import axios from 'axios';

const LOCALHOST = process.env.NEXT_PUBLIC_BASEURL;

/**
 * @description baseURL localhost:3001번으로 설정되어 있습니다.
 * timeout 5초로 설정되어 있습니다.
 */
const commonInstance = axios.create({
  baseURL: `${LOCALHOST}/`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default commonInstance;
