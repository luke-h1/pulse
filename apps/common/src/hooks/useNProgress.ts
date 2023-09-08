import router from 'next/router';
import { useEffect } from 'react';
import NProgress from 'nprogress';

const useNProgress = () => {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    router.events.on('routeChangeStart', handleRouteStart);
    router.events.on('routeChangeComplete', handleRouteDone);
    router.events.on('routeChangeError', handleRouteDone);

    return () => {
      router.events.off('routeChangeStart', handleRouteStart);
      router.events.off('routeChangeComplete', handleRouteDone);
      router.events.off('routeChangeError', handleRouteDone);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events]);

  return null;
};
export default useNProgress;
