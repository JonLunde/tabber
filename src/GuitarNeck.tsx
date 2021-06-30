import React from 'react';

function GuitarNeck() {
  console.log('ENV: ', process.env.NODE_ENV);
  return <div className="guitar-neck" />;
}

export default GuitarNeck;
