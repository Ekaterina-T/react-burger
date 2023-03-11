import { useState, useEffect } from 'react';
import { MILLISECONDS_IN_MINUTE } from '../utils/date-formatter/date-formatter';
import throttle from '../utils/throttle';

const useIdleTimeout = (timeout: number = 1 * MILLISECONDS_IN_MINUTE): boolean => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const trackedEvents = [
      'load',
      'mousemove', 'mousedown', 'click', 'scroll',
      'keypress',
      'touchcancel', 'touchend', 'touchmove', 'touchstart',
    ];
    const timers: { [key: string]: NodeJS.Timeout } = {};

    const eventHandler = throttle((event: string) => {
      setIsActive(true);
      if (timers[event]) {
        clearTimeout(timers[event]);
      }
      timers[event] = setTimeout(() => setIsActive(false), timeout);
    }, MILLISECONDS_IN_MINUTE);

    trackedEvents.forEach((event) => window.addEventListener(event, () => {
      eventHandler(event);
    }));
  }, [timeout]);

  return isActive;
};

export default useIdleTimeout;
