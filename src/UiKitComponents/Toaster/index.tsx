import React from 'react';
import { ToastContainer } from 'react-toastify';
import { ToastContainerProps } from 'react-toastify/dist/types';

const Toaster = () => {
  const options: ToastContainerProps = {
    position: 'top-right',
    hideProgressBar: true,
    theme: 'colored',
  };
  return <ToastContainer {...options} />;
};

export default Toaster;
