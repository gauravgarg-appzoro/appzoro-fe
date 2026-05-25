import { toast } from 'react-toastify';

export const messageNotification = (type, description) => {
  if (typeof toast[type] === 'function') {
    toast[type](description);
  } else {
    toast(description);
  }
};
