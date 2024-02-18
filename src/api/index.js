import axios from 'axios';

const URL = 'https://helsinki-backender.org.kg/';

const API = axios.create({
    baseURL: URL,
    headers: {
      "Content-Type" : 'application/json',
    }
});

API.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

  
API.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) { 
    console.log(error)
  }
  return Promise.reject(error);
});

export const login = async (data) =>{
    const res = await API.post('users/login/admin/', data)
    return res.data
}

