import axios from "./axiosConfig";

export default async function LogInService(data) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const response = await axios
    .post("/user/login", data, { headers })
    .catch((e) => {
      return e.response.data;
    });
  return response.data;
}
