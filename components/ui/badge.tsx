import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-zinc-100 text-zinc-700",
        published: "bg-lyra-published-bg text-lyra-published-text",
        draft: "bg-lyra-draft-bg text-lyra-draft-text",
        new: "bg-blue-100 text-blue-800",
        contacted: "bg-purple-100 text-purple-800",
        appointed: "bg-green-100 text-green-800",
        closed: "bg-zinc-100 text-zinc-600",
        count: "bg-zinc-100 text-zinc-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
