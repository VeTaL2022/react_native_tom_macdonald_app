import axios from 'axios';

import {baseURL} from '../configs';
import {RAPID_API_GENIUS_KEY, RAPID_API_GENIUS_HOST} from '@env';

export const axiosService = axios.create({baseURL});

const geniusHeaders = {
  'X-RapidAPI-Key': RAPID_API_GENIUS_KEY,
  'X-RapidAPI-Host': RAPID_API_GENIUS_HOST,
};

axiosService.interceptors.request.use(config => {
  config.headers = geniusHeaders;
  return config;
});
