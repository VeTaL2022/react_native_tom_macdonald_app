import {axiosService} from '../axios.service';
import {urls} from '../../configs';

export const artistService = {
  getDetails: id => axiosService.get(`${urls.artist}/details/?id=${id}`),
  getSongs: (id, page) =>
    axiosService.get(
      `${urls.artist}/songs/?id=${id}&page=${page}&per_page=15&sort=popularity`,
    ),
  getAlbums: id =>
    axiosService.get(`${urls.artist}/albums/?id=${id}&per_page=25`),
  getLeaderboard: id =>
    axiosService.get(`${urls.artist}/leaderboard/?id=${id}&per_page=5`),
};
