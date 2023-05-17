import axios from 'axios';
import { getCookie } from 'cookies-next';

const formDataInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}`,
  timeout: 20000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

formDataInstance.interceptors.request.use((config) => {
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

export default formDataInstance;
