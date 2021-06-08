import axios from "axios";

const axiosApiInstances = axios.create({
  baseURL: "http://localhost:3004/api/v1/",
});

export default axiosApiInstances;
