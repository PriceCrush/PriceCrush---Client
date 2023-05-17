import axios from 'axios';
import { getCookie } from 'cookies-next';

/**
 * @description baseURL localhost:3001번으로 설정되어 있습니다.
 * timeout 10초로 설정되어 있습니다.
 * 쿠키에서 토큰을 가져와서 헤더에 넣어줍니다.
 */
const commonInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}`,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * @description 요청 전에 실행되는 함수입니다.
 * 이를 통해 헤더에 토큰을 넣어줍니다.
 */

commonInstance.interceptors.request.use((config) => {
  // 쿠키에서 토큰을 가져옵니다
  // 클라이언트 사이드에서만 쿠키를 읽습니다.
  if (typeof window !== 'undefined') {
    const TOKEN = getCookie('accessToken');

    if (TOKEN) {
      config.headers.Authorization = `Bearer ${TOKEN}`;
    }
  }

  return config;
});

export default commonInstance;
