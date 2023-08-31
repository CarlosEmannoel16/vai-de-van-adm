import axios from 'axios';
import config from '../config';
class DashboardService {
    async find() {
        return await axios.get(`${config.baseUrl}/dashboard`);
    }
}

export const dashboardService = new DashboardService();
