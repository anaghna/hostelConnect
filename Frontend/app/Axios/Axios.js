// Set config defaults when creating the instance
import axios from "axios";
const instance = axios.create({
    baseURL: 'http://172.16.5.232:3000'
    // hosted:"https://hostelnow.onrender.com"
  });

export default instance