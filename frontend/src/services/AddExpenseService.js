import axios from "./axiosConfig";

export default async function AddExpenseService(data) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "bearer " + localStorage.getItem("token"),
  };

  try {
    const response = await axios.post("/transaction", data, { headers });
    console.log("yolo");
    console.log(response);
    //     if (response.data.success) {
    //         const userData = await GetUserService(response.data.data);
    //         response.data.user = userData.data;
    //         return response.data;
    //     }
  } catch (e) {
    return e.response.data;
  }
}
