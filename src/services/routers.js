import axios from "axios";
import config from "../config";
import { getTokenUserLocal } from "helpers/localStorage";
class RouterServive {
  async find() {
    return await axios.get(`${config.baseUrl}/route`, {
      headers: { Authorization: `Bearer ${getTokenUserLocal()}` },
    });
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
}

export const routerService = new RouterServive();
