import React from "react";
import { ToastProvider } from 'react-toast-notifications';


const toasty = () => (
  <ToastProvider
    autoDismiss
    autoDismissTimeout={6000}
    placement="bottom-center"
  >
   ola
  </ToastProvider>
);
export default toasty;