import axios from "axios"

export const registerUser = async (input) => {
    try {
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(`http://localhost:5000/api/v2/register`, input, config);
        console.log(data.message);
    } catch (error) {
        console.log(`Register Error : ${error}`);
    }
}

export const loginUser = async (input, navigate) => {
    try {
        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
        const { data } = await axios.post(`http://localhost:5000/api/v2/login`, input, config);
        console.log(data);
        alert(data.message);
        localStorage.setItem("token", data.token);
        navigate("/chats");

    } catch (error) {
        console.log('Error is ', error);
    }
}