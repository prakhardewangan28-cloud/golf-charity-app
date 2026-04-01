"use client";

import * as React from "react";

export function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none ${className}`}
    />
  );
}
