import axios from "axios";
import { OverlayTrigger } from "react-bootstrap";

const API_URL = "https://localhost:3000/api/auth/";

class AuthService {
    register(lastname: string, firstname: string, username: string, email: string, phonenumber: string, password: string) {
        return axios.post(API_URL + "signup", {
            lastname,
            firstname,
            username,
            email,
            phonenumber,
            password
        });
    }

    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);

        return null;
    }
}

export default new AuthService();