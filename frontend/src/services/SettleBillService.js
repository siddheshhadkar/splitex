import axios from "./axiosConfig";

export default async function SettleBillService(data) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `bearer ${localStorage.getItem("token")}`,
  };

  try {
    const response = await axios.put("/transaction", data, { headers });
    if (response.data.success) {
      return response.data;
    }
  } catch (e) {
    return e.response.data;
  }
}
