import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-ink/8 text-ink",
        due: "bg-warn-soft text-warn",
        overdue: "bg-danger-soft text-danger",
        given: "bg-success-soft text-success",
        blocked: "bg-danger text-danger-fg",
        allergy: "bg-danger-soft text-danger",
        cd: "bg-cd text-paper",
        teal: "bg-primary-soft text-primary",
        paper: "bg-ink-3 text-paper",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
