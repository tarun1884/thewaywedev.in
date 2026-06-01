"use client";

import * as React from "react";

/**
 * Minimal asChild-style Slot — clones the only child and merges props/ref.
 * Avoids pulling in @radix-ui/react-slot for the few cases we need it.
 */
export const Slot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>(
  ({ children, ...props }, ref) => {
    if (!React.isValidElement(children)) return null;

    return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
      ...props,
      ...(children.props as Record<string, unknown>),
      ref,
      className: [
        (props as { className?: string }).className,
        (children.props as { className?: string }).className,
      ]
        .filter(Boolean)
        .join(" "),
    });
  }
);
Slot.displayName = "Slot";
