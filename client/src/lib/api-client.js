import axios from "axios";
import { HOST } from "../constants/constants";

export const apiClient = axios.create({
    baseURL: HOST
});

