import axios from "axios";
import { API_URL } from './../utils/constant';


export async function getUsers() {
    const response = await axios.get(`${API_URL}users`);
    return response;
}