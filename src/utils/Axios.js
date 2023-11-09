import axios from "axios";


const host = process.env.REACT_APP_API_KEY;
const hostAPI = host + '/api'


export const loginAuth = (body) => {
  return axios.post(`https://e-field.vercel.app/api/auth`, body);
};

export const registerAuth = (body) => {
  return axios.post(`https://e-field.vercel.app/api/users`, body);
};

export const getProfile = (token) => {
  return axios.get(`https://e-field.vercel.app/api/users`, {
    headers:{
      'x-access-token' : token
    }
  });
};

export const allFieldCustomer = (name = '', city = '', sort = '', page = 1) => {
  return axios.get(`https://e-field.vercel.app/api/field?limit=6&page=${page}&city=${city}&name=${name}&sort=${sort}`);
};

export const patchProfile = (token, body) => {
  return axios.patch(`https://e-field.vercel.app/api/users/profile`, body, {
    headers:{
      'x-access-token' : token,
      'Content-Type':'multipart/form-data'
    }
  });
};


export const changePassword = (token,body) => {
  return axios.patch(`https://e-field.vercel.app/api/users/editpass`, body, {
    headers:{
      'x-access-token' : token
    }
  });
};


export const changeIdentity = (token,body) => {
  return axios.patch(`https://e-field.vercel.app/api/users/ktp`, body, {
    headers:{
      'x-access-token' : token
    }
  });
};
