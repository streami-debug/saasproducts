import { forwardRef, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

export interface GlassPanelProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  hoverEffect?: boolean;
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ children, className, hoverEffect = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hoverEffect ? { translateY: -4, borderColor: "rgba(0, 240, 255, 0.25)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" } : undefined}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 transition-colors duration-300",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassPanel.displayName = "GlassPanel";
