/* eslint-disable no-shadow */
import { useEffect, useState } from 'react';
import isServer from '../src/utils/isServer';

const useMediaQuery = (query: string): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getMatches = (query: string): boolean => {
    if (!isServer) {
      return window.matchMedia(query).matches;
    }

    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  const handleChange = () => {
    setMatches(getMatches(query));
  };

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // triggered on first client-side load & if query changes
    handleChange();

    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener('change', handleChange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
};

export default useMediaQuery;
