import axiosApi from '../utils/axiosApi';
import { publicRuntimeConfig } from '../../next.config.js';
const API_URL = publicRuntimeConfig?.API_URL;


export const getClients = (fields = []) => {
  /*
  * List clients accessible by current user
  * Arg: fields - database fields to fetch for each record
  * */
  let clientsUrl = `/clients`;
  if (fields?.length > 0) {
    clientsUrl = `${clientsUrl}?fields=${fields.join(',')}`
  }

  return axiosApi
  .get(clientsUrl)
  .then((res) => res.data)
  .catch((err) => Promise.reject(err));
};
