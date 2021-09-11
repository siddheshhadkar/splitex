import axios from "./axiosConfig";
import GetUserService from "./GetUserService";

export default async function AddBalanceService(data) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: "JWT " + localStorage.getItem("token"),
  };

  try {
    const response = await axios.put("/user", data, { headers });
    if (response.data.success) {
      const userData = await GetUserService(response.data.data);
      response.data.user = userData.data;
      return response.data;
    }
  } catch (e) {
    return e.response.data;
  }
}
