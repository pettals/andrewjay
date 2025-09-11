import { ButtonHTMLAttributes, forwardRef } from "react";
import cn from "classnames";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = "primary", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        "focus-ring inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition",
        variant === "primary" &&
          "bg-accent text-white shadow-[0_10px_40px_-10px_rgba(255,46,166,0.45)] hover:opacity-95",
        variant === "ghost" &&
          "bg-black/5 text-fg hover:bg-black/10 border border-black/10",
        className
      )}
      {...props}
    />
  );
});

export default Button;


