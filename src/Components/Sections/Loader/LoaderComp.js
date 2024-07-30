import React from 'react';
import { CircularProgress } from '@mui/material';

const LoaderComp = () => {
  return (
    <div style={{ width: '100%', padding: '6em' }}>
          {/* @@ SHOW LOADER HERE !!  */}
          <CircularProgress color='secondary' />
        </div>
  )
};

export default LoaderComp;