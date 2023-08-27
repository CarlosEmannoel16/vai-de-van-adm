import axios from "axios";
import config from "../config";
import { getTokenUserLocal } from "helpers/localStorage";
class TravelService {
  async create(data) {
    return await axios.post(`${config.baseUrl}/travel`, data, {
      headers: { Authorization: `Bearer ${getTokenUserLocal()}` },
    });
  }

  async getAll() {
    return await axios.get(`${config.baseUrl}/travel/all`, {
      headers: { Authorization: `Bearer ${getTokenUserLocal()}` },
    });
  }
}

export const travelService = new TravelService();
