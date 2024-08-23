import { useState } from 'react';

const useIdentityVerification = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = process.env.RAPIDAPI_KEY; // Retrieve the API key from environment variables
  const apiHost = process.env.RAPIDAPI_HOST; // Retrieve the API host from environment variables

  const verifyIdentity = async (fullname, idNumber) => {
    const url = 'https://identity-verification-from-id.p.rapidapi.com/verify-identity';
    const data = new FormData();
    data.append('fullname', fullname);
    data.append('id_number', idNumber); // Include the ID number in the request

    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost,
      },
      body: data,
    };

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      const result = await response.json(); 
      setResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { verifyIdentity, loading, result, error };
};

export default useIdentityVerification;
