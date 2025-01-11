import { toast } from 'react-toastify';
import { ToastType } from '../types/toast.types';

const showToast = (message: string, type: ToastType = ToastType.INFO) => {
  const toastOptions = {
    className: 'custom-toast',
    progressClassName: 'custom-toast-progress',
    autoClose: 1200,
  };

  switch (type) {
    case ToastType.INFO:
      toast.info(message, toastOptions);
      break;
    case ToastType.SUCCESS:
      toast.success(message, toastOptions);
      break;
    case ToastType.ERROR:
      toast.error(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
  }
};

export default showToast;
