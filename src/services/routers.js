import axios from "axios";
import config from "../config";
import { getTokenUserLocal } from "helpers/localStorage";
class RouterServive {
  async find() {
    const data = await axios.get(`${config.baseUrl}/route`, {
      headers: { Authorization: `Bearer ${getTokenUserLocal()}` },
    });
    return data;
  }

  async create(data) {
    return await axios.post(
      `${config.baseUrl}/route`,
      { ...data },
      {
        headers: { Authorization: `Bearer ${getTokenUserLocal()}` },
      }
    );
  }

  async update(data) {
    return await axios.get(
      `${config.baseUrl}/route`,
      {
        headers: { Authorization: `Bearer ${getTokenUserLocal()}` },
      },
      { ...data }
    );
  }
}

export const routerService = new RouterServive();
