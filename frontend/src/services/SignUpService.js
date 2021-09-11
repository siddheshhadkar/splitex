import axios from "./axiosConfig";
import LogInService from "./LogInService";

export default async function SignUpService(data) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post("/user", data, { headers });
    if (response.data.success === true) {
      delete data.name;
      return await LogInService(data);
    }
  } catch (e) {
    return e.response.data;
  }
}
