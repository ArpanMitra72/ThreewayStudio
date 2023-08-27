import axios from "axios";

const instance = axios.create({
  baseURL: "https://threewaystudio-site20.onrender.com",
});

export default instance;
