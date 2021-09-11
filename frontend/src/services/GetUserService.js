import axios from "./axiosConfig";

export default async function GetUserService(
  token = localStorage.getItem("token")
) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `bearer ${token}`,
  };

  try {
    const response = await axios.get("/user", { headers });
    return response.data;
  } catch (e) {
    return e.response.data;
  }
}
