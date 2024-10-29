/* eslint-disable no-undef */
import axios from "axios";

const instance = axios.create({
    baseURL: process.env.VITE_REACT_APP_BASE_URL,
    timeout: 3600,
    headers: {
        'Content-Type': 'application/json',
    },
  });

  export default instance;