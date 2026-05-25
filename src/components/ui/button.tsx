import { forwardRef, ButtonHTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "variant" | "size"> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-xl transition-all tracking-wide duration-200 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 focus:ring-offset-space-black",
          {
            "bg-hyper-growth text-space-black font-semibold shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:opacity-95": variant === 'primary',
            "bg-white/10 text-white border border-white/20 hover:bg-white/15": variant === 'secondary',
            "text-white/80 hover:text-white hover:bg-white/5": variant === 'ghost',
            "px-3 py-1.5 text-xs": size === 'sm',
            "px-5 py-2.5 text-sm": size === 'md',
            "px-8 py-4 text-base": size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
