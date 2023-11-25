import axios from 'axios';

const host = process.env.REACT_APP_API_KEY;
const hostAPI = host + '/api';

export const loginAuth = (body) => {
  return axios.post(`https://e-field.vercel.app/api/auth`, body);
};

export const registerAuth = (body) => {
  return axios.post(`https://e-field.vercel.app/api/users`, body);
};

export const getProfile = (token) => {
  return axios.get(`https://e-field.vercel.app/api/users`, {
    headers: {
      'x-access-token': token,
    },
  });
};

export const getFieldUserId = (token) => {
  return axios.get(`https://e-field.vercel.app/api/field/detail/owner`, {
    headers: {
      'x-access-token': token,
    },
  });
};

export const getDetailFieldOwner = (id) => {
  return axios.get(`https://e-field.vercel.app/api/field/images/${id}`);
};

export const allFieldCustomer = (name = '', city = '', sort = '', page = 1) => {
  return axios.get(
    `https://e-field.vercel.app/api/field?limit=6&page=${page}&city=${city}&name=${name}&sort=${sort}`
  );
};

export const getDetailField = (id, date) => {
  return axios.get(`https://e-field.vercel.app/api/field/detail/${id}/${date}`);
};

export const patchProfile = (token, body) => {
  return axios.patch(`https://e-field.vercel.app/api/users/profile`, body, {
    headers: {
      'x-access-token': token,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const changePassword = (token, body) => {
  return axios.patch(`https://e-field.vercel.app/api/users/editpass`, body, {
    headers: {
      'x-access-token': token,
    },
  });
};

export const changeIdentity = (token, body) => {
  return axios.patch(`https://e-field.vercel.app/api/users/ktp`, body, {
    headers: {
      'x-access-token': token,
    },
  });
};

export const addFieldOwner = (token, body) => {
  return axios.post(`https://e-field.vercel.app/api/field`, body, {
    headers: {
      'x-access-token': token,
    },
  });
};

export const editFieldOwner = (token, body, id) => {
  return axios.patch(`https://e-field.vercel.app/api/field/${id}`, body, {
    headers: {
      'x-access-token': token,
      'Content-Type': 'mulipart/form-data',
    },
  });
};


export const postPaymentCustomer = (token,body) => {
  return axios.post(`https://e-field.vercel.app/api/payment/`, body, {
    headers:{
      'x-access-token' : token
    }
  });
};


export const getHistoryCustomer = (token,status) => {
  return axios.get(`https://e-field.vercel.app/api/payment/customer/history/${status}`, {
    headers: {
      'x-access-token': token,
    },
  });
};


export const logout = (token) => {
  return axios.delete(`https://e-field.vercel.app/api/auth/`, {
    headers: {
      'x-access-token': token,
    },
  });
};


export const getHistoryOwner = (token,status) => {
  return axios.get(`https://e-field.vercel.app/api/payment/owner/history/${status}`, {
    headers: {
      'x-access-token': token,
    },
  });
};

