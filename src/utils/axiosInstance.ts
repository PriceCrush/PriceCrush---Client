import axios from 'axios';
import { getCookie, removeCookies, setCookie } from 'cookies-next';
import { setExpireTime } from '@/utils/setExpireTime';

let subscribers: any[] = []; // 여러 axios요청 저장후 한번에 요청
let requestAccessTokenStatus = false;

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
/**
 * @description 응답 시 사용되는 함수
 * refreshToken 있지만 401에러 발생 시 accessToken을 새롭게 발급 후 cookie에 저장
 */
commonInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const { config, response } = error;

    const originalRequest = config; //응답전 요청
    const errorCode = response.status; //에러 코드
    const errorMessage = response.data.message; //에러 메세지

    if (errorCode === 401) {
      return await refreshTokenRequest(originalRequest);
    }

    return Promise.reject(error);
  }
);

/**
 * @param config
 * @returns retryRequest : refreshToken으로 새롭게 발급받은 accessToken
 * @description refreshToken이 있을 시 서버에 accessToken요청, 받은 accessToken 쿠키에 새롭게 저장,
 * @description 오류 발생 시 accessToken, refreshToken 삭제,
 */

const refreshTokenRequest = async (config: any) => {
  try {
    const REFRESH_TOEKN_REQ_API_URL = '/api/member/refreshApi';
    const refreshToken = getCookie('myRefreshKey');

    if (refreshToken) {
      const retryRequest = new Promise((resolve, reject) => {
        // accessToken이 필요한 요청들
        const callback = async (accessToken: any) => {
          try {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
            resolve(axios(config));
          } catch (error) {
            reject(error);
          }
        };
        //리프레시 요청 배열에 저장
        addSubscriber(callback);
      });

      if (!requestAccessTokenStatus) {
        requestAccessTokenStatus = true;

        const res = await axios.post(REFRESH_TOEKN_REQ_API_URL, {});

        const accessToken = res.data;
        const timeLimit = setExpireTime(1);
        const options = {
          path: '/',
          expires: timeLimit, // 이 부분은 accessTotkenExpireTime가 유효한 날짜 문자열 또는 timestamp일 때만 동작합니다.
        };
        setCookie('accessToken', accessToken, options);

        requestAccessTokenStatus = false;
        // 이전 요청들에 새롭게 발급받은 accessToken 삽입 후 요청
        onAccessTokenFetched(accessToken);
      }

      return retryRequest;
    } else {
      throw '리프레시 오류';
    }
  } catch (error) {
    logout();
    window.location.href = '/member/login';
    return Promise.reject(error);
  }
};

const addSubscriber = (callback: any) => {
  subscribers.push(callback);
};

const onAccessTokenFetched = (token: any) => {
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
};

const logout = () => {
  removeCookies('accessToken');
  removeCookies('myRefreshKey');
};

export default commonInstance;
