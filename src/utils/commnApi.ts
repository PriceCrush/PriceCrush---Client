import instance from '@/utils/axiosInstance';
import type { AxiosRequestConfig } from 'axios';

/**
 *
 * @param url - baseURL을 제외한 url
 * @param config - 추가적인 axios 설정이 필요할 때 입력하세요
 * @returns
 */
const get = async <T = any>(url: string, config?: AxiosRequestConfig) => {
  try {
    const response = await instance.get<T>(url, { ...config });
    return response.data;
  } catch (error) {
    throw error;
  }
};
/**
 *
 * @param url - baseURL을 제외한 url
 * @param config - 추가적인 axios 설정이 필요할 때 입력하세요
 * @returns
 */
const post = async <T = any>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig
) => {
  try {
    const response = await instance.post<T>(url, body, {
      ...config,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
/**
 *
 * @param url - baseURL을 제외한 url
 * @param config - 추가적인 axios 설정이 필요할 때 입력하세요
 * @returns
 */
const put = async <T = any>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig
) => {
  try {
    const response = await instance.put<T>(url, body, { ...config });
    return response.data;
  } catch (error) {
    throw error;
  }
};
/**
 *
 * @param url - baseURL을 제외한 url
 * @param config - 추가적인 axios 설정이 필요할 때 입력하세요
 * @returns
 */
const del = async <T = any>(url: string, config?: AxiosRequestConfig) => {
  try {
    const response = await instance.delete<T>(url, { ...config });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { get, post, put, del as delete };
