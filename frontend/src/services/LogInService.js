import axios from "./axiosConfig";

export default async function LogInService(data) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post("/user/login", data, { headers });
    return response.data;
  } catch (e) {
    return e.response.data;
  }
}
