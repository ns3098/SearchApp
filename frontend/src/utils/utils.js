import axios from "axios";

export const sendGetRequest = (url, callback) => {
    axios
      .get(url)
      .then((response) => callback(response))
      .catch((error) => {
        console.log(error);
      });
}