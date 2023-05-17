import formDataInstance from './formDataInstance';
import type { AxiosRequestConfig } from 'axios';

export class FormDataApi {
  static post = async <T = any>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig
  ) => {
    try {
      const response = await formDataInstance.post<T>(url, body, { ...config });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}
