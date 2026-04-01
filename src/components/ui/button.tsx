"use client";

import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: string;
  size?: string;
  asChild?: boolean;
}

export function Button({ children, className = "", variant, size, asChild, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg font-semibold transition-colors bg-green-600 text-white hover:bg-green-700 ${className}`}
    >
      {children}
    </button>
  );
}
