import axios from "axios";

const BASE_URL = "https://api-pets-shop.herokuapp.com/";



export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials:true,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials:true,
});
