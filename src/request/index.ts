import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as config from '@/config';
import { Toast } from 'vant';

const request = axios.create({
    baseURL: config.baseUrl,
    timeout: 10000
});


request.interceptors.request.use(async (req) => {
  const token: string | null = localStorage.getItem('token');
  if (token !== undefined && token !== null ) {
    req.headers = { Authorization: token }
  }
  return req;
}, () => {})

request.interceptors.response.use(async (response) => {
  if (response.status !== 200){
    Toast.fail(response.statusText);
  }
  return response;
  }, () => {})



// eslint-disable-next-line no-async-promise-executor
export default <T>(config: AxiosRequestConfig) => new Promise<T>(async (resolve, reject) => {
    try {
      const response = await request.request(config);
      if (response.data.code !== 200) {
        console.log('---reject---');
        Toast.fail(response.data.msg);
        return reject(response.data);
      }
      resolve(response.data);
    } catch(err) {
      Toast.fail(err.message);
      reject(err);
    }
});