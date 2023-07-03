import { useEffect, useLayoutEffect } from 'react';
import isServer from '../src/utils/isServer';

const useIsomorphicLayoutEffect = !isServer ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
