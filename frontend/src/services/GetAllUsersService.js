import axios from "./axiosConfig";

export default async function GetAllUsersService() {

    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
    };

    try {
        const response = await axios.get("/user/all", { headers });
        console.log("getting all users");
        // console.log(response);
        return response.data.data;
    } catch (e) {
        return e.response.data;
    }
}
