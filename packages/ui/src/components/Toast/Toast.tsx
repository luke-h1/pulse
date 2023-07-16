/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-shadow */

import * as ToastPrimitive from '@radix-ui/react-toast';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { nanoid } from 'nanoid';
import { X } from 'react-feather';
import createStore from 'zustand';
import * as styles from './Toast.css';

export interface Toast {
  id?: string;
  title?: string;
  content: string;
}

interface ToastStore {
  toasts: Toast[];
  toast: (data: Toast) => string;
  removeToast: (id: string) => void;
}

const useStore = createStore<ToastStore>(set => ({
  toasts: [],
  toast: data => {
    const id = nanoid();
    set(state => ({
      toasts: [
        {
          ...data,
          id,
        },
        ...state.toasts,
      ],
    }));

    return id;
  },
  removeToast: (id: string) =>
    set(({ toasts }) => {
      const i = toasts.findIndex(t => t.id === id);
      if (i === -1) return { toasts };
      return {
        toasts: [...toasts.slice(0, i), ...toasts.slice(i + 1)],
      };
    }),
}));
export const toast = (...args: Parameters<ToastStore['toast']>) => {
  return useStore.getState().toast(...args);
};

export const removeToast = (...args: Parameters<ToastStore['removeToast']>) => {
  return useStore.getState().removeToast(...args);
};

export const Toaster = () => {
  const reducedMotion = useReducedMotion();
  const { toasts, removeToast } = useStore();
  return (
    <ToastPrimitive.Provider>
      <AnimatePresence>
        {toasts &&
          toasts.map(toast => (
            <ToastPrimitive.Root
              key={toast.id}
              className={styles.root}
              asChild
              forceMount
              open
              onOpenChange={open => {
                if (open === false) {
                  removeToast(toast.id as string);
                }
              }}
              duration={8000}
            >
              <motion.div
                layout={reducedMotion ? false : 'position'}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: reducedMotion ? 1 : 0.75,
                  transition: { duration: 0.2 },
                }}
                transition={{
                  ease: 'easeInOut',
                  duration: 0.2,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 300 }}
              >
                {toast.title && (
                  <ToastPrimitive.Title className={styles.title}>
                    {toast.title}
                  </ToastPrimitive.Title>
                )}
                <ToastPrimitive.Description className={styles.description}>
                  {toast.content}
                </ToastPrimitive.Description>
                <ToastPrimitive.Close
                  aria-label="Close"
                  className={styles.close}
                >
                  <span className={styles.closeHighlight} />
                  <span aria-hidden className={styles.closeIcon}>
                    <X width={16} />
                  </span>
                </ToastPrimitive.Close>
              </motion.div>
            </ToastPrimitive.Root>
          ))}
      </AnimatePresence>
      <ToastPrimitive.Viewport className={styles.viewport} />
    </ToastPrimitive.Provider>
  );
};
