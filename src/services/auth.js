import axios from 'axios';
import config from '../config';
export class AuthLogin {
    async login({ email, password }) {
        return await axios.post(`${config.baseUrl}/login`, { email, password });
    }
}
