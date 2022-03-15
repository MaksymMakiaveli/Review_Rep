import React from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import { ToastContainerProps } from 'react-toastify/dist/types';

const Toaster = () => {
  const options: ToastContainerProps = {
    position: 'top-right',
    hideProgressBar: true,
    theme: 'colored',
    pauseOnFocusLoss: false,
    autoClose: 3000,
    transition: Zoom,
  };
  console.log('TOASTER SHOW');
  return <ToastContainer {...options} />;
};

export default Toaster;
