import { useCallback, useEffect, useRef, useState } from 'react';
import request from '../request';

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
        const response = await request({
          method: 'GET',
          url: newUrl || url,
          params: params || initialParamsRef.current || {},
          timeout,
        });

        setResponse(response);
        if (onSuccess) onSuccess(response);
        setLoading(false);
      } catch (err) {
        console.log('Error in get request', err.response);
        setError(err);
        if (onError) onError(err);
        setLoading(false);
      }
    },
    [url]
  );

  useEffect(() => {
    if (callOnMount) get();
  }, []);

  return [get, { response, error, loading }];
};
