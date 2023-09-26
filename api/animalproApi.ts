import axios from "axios";

const animalproApi = axios.create({
  baseURL: "/api",
});

export default animalproApi;
