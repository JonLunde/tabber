import React, { useEffect, useState } from 'react';
import Tabber from './Tabber';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/test')
      .then((result) => result.json())
      .then(
        (customers) => setData(customers),
        () => console.log('Customer fetched ', customers),
      );
  }, []);

  // // fetching the GET route from the Express server which matches the GET route from server.js
  // callBackendAPI = async () => {
  //   const response = await fetch('/api/test');
  //   const body = await response.json();

  //   if (response.status !== 200) {
  //     throw Error(body.message);
  //   }
  //   return body;
  // };

  return <Tabber />;
}

export default App;
