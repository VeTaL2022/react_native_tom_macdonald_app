import {axiosService} from '../axios.service';
import {urls} from '../../configs';

export const songService = {
  getDetails: id => axiosService.get(`${urls.song}/details/?id=${id}`),
  getLyrics: id => axiosService.get(`${urls.song}/lyrics/?id=${id}`),
  getRecommendations: id =>
    axiosService.get(`${urls.song}/recommendations/?id=${id}`),
};
