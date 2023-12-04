import axios from 'axios';

export const susPendUserApi = (token, id) => {
  return axios.post(`https://e-field.vercel.app/api/admin/suspend/${id}`, {
    headers: {
      'x-access-token': token,
    },
  });
};
