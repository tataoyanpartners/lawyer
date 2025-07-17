"use client";

import { FC, HTMLAttributes, ReactNode } from "react";
interface Area extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "lower__shadow";
  className?: string;
  children?: ReactNode;
}

export const Area: FC<Area> = ({
  variant = "default",
  className,
  children,
}: Area) => {
  
  const baseStyles = "rounded-[14px] p-2 bg-[#191a1d] shadow";
  const variantStyles = {
    default:
      "",
    lower__shadow:
      "",
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};
