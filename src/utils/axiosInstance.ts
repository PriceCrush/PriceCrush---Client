import axios from 'axios';

const LOCALHOST = 'http://localhost:3001';
const SERVER_BASE_URL =
  'http://ec2-13-124-196-195.ap-northeast-2.compute.amazonaws.com:3000/';

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
