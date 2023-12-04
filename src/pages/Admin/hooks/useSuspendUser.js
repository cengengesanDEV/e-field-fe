import { useCallback, useState } from 'react';
import { susPendUserApi } from '../api/suspendUser';

export const useSuspendUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [suspendModalVisibility, setSuspaendModalVisibility] = useState(false);

  const suspendUser = useCallback(async (id, token, cb) => {
    try {
      setIsLoading(true);

      await susPendUserApi(token, id);
      setIsLoading(false);
      setSuspaendModalVisibility(false);
      if (typeof cb === 'function') cb();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setSuspaendModalVisibility(false);
    }
  }, []);
  const toggleSuspendModal = useCallback(() => {
    setSuspaendModalVisibility((val) => !val);
  }, []);

  return { isLoading, suspendUser, suspendModalVisibility, toggleSuspendModal };
};
