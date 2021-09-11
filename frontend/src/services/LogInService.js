import axios from "./axiosConfig";
import GetUserService from "./GetUserService";

export default async function LogInService(data) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post("/user/login", data, { headers });
    if (response.data.success) {
      const userData = await GetUserService(response.data.data);
      response.data.user = userData.data;
      return response.data;
    }
  } catch (e) {
    return e.response.data;
  }
}
