import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const activeHttpRequest = useRef([]);

  const sendRequest = useCallback(async (url, method='GET', body=null, headers={}) => {
    setIsLoading(true);
    const httpAbortCtrl = new AbortController();
    activeHttpRequest.current.push(httpAbortCtrl);
    try {
      const response = await fetch(url, {
        method,
        headers,
        body,
        signal: httpAbortCtrl.signal,
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setIsLoading(false);
      return responseData;
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      throw err;
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  // If useEffect callback returns a function, it becomes a "componentWillUnmount" cleanup function
  useEffect(() => {
    return () => {
      // Cancel can running API calls when component unmounts
      activeHttpRequest.current.forEach(abortCtrl => abortCtrl.abort())
    };
  }, []);

  return {isLoading, error, sendRequest, clearError}
};
