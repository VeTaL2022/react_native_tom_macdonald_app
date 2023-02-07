import {axiosService} from '../axios.service';
import {urls} from '../../configs';

export const albumService = {
  getDetails: id => axiosService.get(`${urls.album}/details/?id=${id}`),
  getSongs: id => axiosService.get(`${urls.album}/appearances/?id=${id}`),
};
