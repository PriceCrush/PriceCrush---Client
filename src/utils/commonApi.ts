import instance from '@/utils/axiosInstance';
import type { AxiosRequestConfig } from 'axios';

export class Api {
  static get = async <T = any>(url: string, config?: AxiosRequestConfig) => {
    try {
      const response = await instance.get<T>(url, { ...config });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  static post = async <T = any>(
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

  static put = async <T = any>(
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

  static delete = async <T = any>(url: string, config?: AxiosRequestConfig) => {
    try {
      const response = await instance.delete<T>(url, { ...config });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}
