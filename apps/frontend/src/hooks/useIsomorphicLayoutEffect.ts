import { useEffect, useLayoutEffect } from 'react';
import isServer from '@common/hooks';

const useIsomorphicLayoutEffect = !isServer ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
