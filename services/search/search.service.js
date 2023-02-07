import {axiosService} from '../axios.service';
import {urls} from '../../configs';

export const searchService = {
  getByName: trackName =>
    axiosService.get(`${urls.search}/?q=${trackName} Tom`),
};
