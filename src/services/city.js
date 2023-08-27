import axios from 'axios';
import config from '../config';
class CityService {
    async find() {
        return await axios.get(`${config.baseUrl}/city`);
    }
}

export const cityService = new CityService();
