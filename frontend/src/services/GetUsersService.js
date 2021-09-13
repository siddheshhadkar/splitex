import axios from "./axiosConfig";

export default async function GetUsersService() {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `bearer ${localStorage.getItem("token")}`,
  };

  try {
    const response = await axios.get("/user/all", { headers });
    if (response.data.success) {
      return response.data;
    }
  } catch (e) {
    return e.response.data;
  }
}
