import { useCallback, useEffect, useRef, useState } from 'react';
import axios from "axios";

/**
 * @typedef {{params?, onSuccess?, onError?, newUrl?, timeout?}} GetParams
 */

/**
 *
 * @param {string} url
 * @param {boolean} [callOnMount=true]
 * @param {object} [initialParams={}]
 * @returns {[({params, onSuccess, onError, newUrl, timeout}?: GetParams) => Promise<any>, {response, error, loading}]}
 */
export const useGetRequest = (url, callOnMount = true, initialParams = {}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const initialParamsRef = useRef(initialParams);

  const get = useCallback(
    async (
      { params, onSuccess, onError, newUrl, timeout } = {
        params: undefined,
        onSuccess: undefined,
        onError: undefined,
        newUrl: undefined,
        timeout: 0,
      }
    ) => {
      setLoading(true);
      try {
        const r = await axios.get(url);
        console.log(r, "yoo")
        setResponse(r);
        if (onSuccess) onSuccess(response);
        setLoading(false);
      } catch (err) {
        console.log('Error in get request', err.response);
        setError(err);
        if (onError) onError(err);
        setLoading(false);
      }
    },
    [response, url]
  );

  useEffect(() => {
    if (callOnMount) get();
  }, []);

  return [get, { response, error, loading }];
};
