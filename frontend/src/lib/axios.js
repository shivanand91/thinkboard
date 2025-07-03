import axios from "axios";

// in production, there's no localhost so we have to make this dynamic
const MODE = import.meta.env?.MODE || process.env.NODE_ENV || "production";
const BASE_URL = MODE === "development" ? "http://localhost:5001/api" : "/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;