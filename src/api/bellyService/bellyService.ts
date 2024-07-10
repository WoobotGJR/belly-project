import { Bean, Paginable } from '../utils/types/types';
import axiosClient from '../api';

const bellyService = {
  getBellies: async (params: {
    pageIndex: number;
    pageSize: number;
  }): Promise<Paginable<Bean>> => {
    return (await axiosClient.get('/beans', { params: params })).data;
  },
  getQueryBellies: async (params: { query: string }) => {
    return await axiosClient.get('/beans', { params: params });
  },
  getBellyById: async (id: string | undefined) => {
    return await axiosClient.get(`/beans/${id}`);
  },
};

export default bellyService;
