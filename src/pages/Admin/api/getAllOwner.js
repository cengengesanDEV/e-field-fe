import axios from 'axios';

export const getAllOwner = (token, name) => {
  return axios.get(`https://e-field.vercel.app/api/admin/user/owner`, {
    headers: {
      'x-access-token': token,
    },
  });
};
