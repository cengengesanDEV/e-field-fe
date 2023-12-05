import axios from 'axios';

export const suspendUserApi = (token, id) => {
  return axios.post(`https://e-field.vercel.app/api/admin/suspend/${id}`, {
    headers: {
      'x-access-token': token,
    },
  });
};
