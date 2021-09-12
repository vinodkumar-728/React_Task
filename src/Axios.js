import axios from "axios"

const APIKEY = "23347224-947347a697f2d7579d2a2b66b";
const BASEURL = "https://pixabay.com/api/?key="+ APIKEY;

export const getRequest = async(uri) => {
    try {
      const response = await axios.get(BASEURL + (uri === (undefined || null || '')? '': uri));
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }