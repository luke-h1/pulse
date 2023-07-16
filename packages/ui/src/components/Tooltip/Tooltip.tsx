import { TooltipProps } from '@radix-ui/react-tooltip';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';
import * as styles from './Tooltip.css';

export const Tooltip = ({
  content,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: TooltipProps & { content: string; children: ReactNode }) => {
  const children = props.children as ReactNode;
  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content className={styles.content} {...props}>
        {content}
        <TooltipPrimitive.Arrow
          className={styles.arrow}
          width={11}
          height={5}
        />
      </TooltipPrimitive.Content>{' '}
    </TooltipPrimitive.Root>
  );
};
