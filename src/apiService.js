import axios from "axios";

const API_URL = "https://api.punkapi.com/v2"

export const Http = axios.create({
    baseURL: API_URL
})