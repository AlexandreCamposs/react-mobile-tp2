import axios from "axios";

const Api = axios.create({
  baseURL: "https://apitypescriptfacu.herokuapp.com",
});

export default Api;
