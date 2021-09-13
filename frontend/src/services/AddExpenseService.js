import axios from "./axiosConfig";

export default async function AddExpenseService(data) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "bearer " + localStorage.getItem("token"),
  };

  try {
    const response = await axios.post("/transaction", data, { headers });
    if (response.data.success) {
      console.log(response);
      return response.data;
    }
  } catch (e) {
    return e.response.data;
  }
}
