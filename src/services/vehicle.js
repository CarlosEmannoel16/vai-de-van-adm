import axios from "axios";
import config from "../config";
import { getTokenUserLocal } from "helpers/localStorage";
class ServiceVehicles {
  async create(data) {
    return await axios.post(`${config.baseUrl}/vehicle`, data, {
      headers: { Authorization: `Bearer ${getTokenUserLocal()}` },
    });
  }

  async update(data) {
    return await axios.put(`${config.baseUrl}/vehicle`, data, {
      headers: { Authorization: `Bearer ${getTokenUserLocal()}` },
    });
  }

  async getAll() {
    return await axios.get(`${config.baseUrl}/vehicle`, {
      headers: { Authorization: `Bearer ${getTokenUserLocal()}` },
    });
  }

  async getById(id) {
    return await axios.get(`${config.baseUrl}/vehicle/${id}`, {
      headers: { Authorization: `Bearer ${getTokenUserLocal()}` },
    });
  }

  async deleteById(id) {
    return await axios.delete(`${config.baseUrl}/vehicle/${id}`, {
      headers: { Authorization: `Bearer ${getTokenUserLocal()}` },
    });
  }
}
export const serviceVehicles = new ServiceVehicles();
