import axios from "axios";
import toast from "react-hot-toast";


const isLocalhost = 
  window.location.hostname === "localhost" || 
  window.location.hostname === "127.0.0.1";


export const API_BASE_URL = isLocalhost 
  ? "http://localhost:5000/api"                                 
  : "https://carpet-backend-w8qc.onrender.com/api";
  
  export default API_BASE_URL;

