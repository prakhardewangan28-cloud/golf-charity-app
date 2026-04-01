"use client";

import * as React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div {...props} className={`bg-white p-6 rounded-xl border shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }: CardProps) {
  return (
    <div {...props} className={className}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "", ...props }: CardProps) {
  return (
    <div {...props} className={className}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "", ...props }: CardProps) {
  return (
    <h3 {...props} className={`font-bold ${className}`}>
      {children}
    </h3>
  );
}

export function GlassCard({ children, className = "", ...props }: CardProps) {
  return (
    <div {...props} className={`bg-white/70 backdrop-blur-md rounded-3xl border shadow-sm ${className}`}>
      {children}
    </div>
  );
}
