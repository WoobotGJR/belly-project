import axios, { AxiosError } from 'axios';

const notifier = {
  success: (message: string) => {
    console.log(message);
  },
  error: (message: string) => {
    console.log(message);
  },
};

const errorComposer = (error: AxiosError) => {
  return () => {
    const statusCode = error.response ? error.response.status : null;
    if (statusCode === 404) {
      notifier.error(
        'The requested resource does not exist or has been deleted'
      );
    }

    if (statusCode === 500) {
      notifier.error('An internal server error has occurred');
    }
  };
};

const axiosClient = axios.create({
  baseURL: 'https://jellybellywikiapi.onrender.com/api/',
});

axiosClient.interceptors.request.use(
  (response) => {
    notifier.success('Request sent');
    return response;
  },
  (error) => {
    error.handleGlobally = errorComposer(error);
    return Promise.reject(error);
  }
);

export default axiosClient;
