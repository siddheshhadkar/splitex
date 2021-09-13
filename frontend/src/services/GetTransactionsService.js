import axios from "./axiosConfig";

export default async function GetTransactionsService() {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `bearer ${localStorage.getItem("token")}`,
  };

  try {
    const response = await axios.get("/transaction/all", { headers });
    return response.data;
  } catch (e) {
    return e.response.data;
  }
}
