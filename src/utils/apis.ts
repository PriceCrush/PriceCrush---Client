import axios, { AxiosPromise } from 'axios';

const baseUrl = 'http://localhost:4000/';

export const api = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
});

export const tempFetch = async (url: string) => {
  const { data } = await axios.get(url);
  return data[0];
};
