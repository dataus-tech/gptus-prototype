import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:8080/',
});

instance.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = 'Bearer ' + accessToken;
  }
  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      alert('인증 토큰이 만료되었습니다.');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('username');
    }
    return Promise.reject(error);
  },
);
