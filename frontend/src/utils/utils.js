import axios from "axios";

export const sendGetRequest = (url, callback, setLoading) => {
  setLoading(true);
  axios
    .get(url)
    .then((response) => {
      callback(response);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
};
