import axios from "axios";

const axiosApiInstances = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export default axiosApiInstances;
