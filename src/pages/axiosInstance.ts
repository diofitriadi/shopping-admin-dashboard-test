import axios from 'axios';
import { useRouter } from 'next/router';

const instance = axios.create({
  baseURL: 'https://dummyjson.com',
  withCredentials: true,
});

// Create a new router instance
// eslint-disable-next-line react-hooks/rules-of-hooks
const router = useRouter();

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // If we get a 401, redirect the user to the login page
      router.push('/login');
    }

    return Promise.reject(error);
  }
);

export default instance