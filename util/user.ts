import axios from 'axios';

export const createUser = async (uid: string, email: string) => {
  await axios.post('/api/users', { uid, email });
};
