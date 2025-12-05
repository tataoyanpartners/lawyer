"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default";
}

export const Button = ({
  variant = "default",
  className,
  ...props
}: ButtonProps) => {
  const baseStyles = "";

  const variantStyles = {
    default: "bg-[#486BAD] hover:bg-[#172554] rounded-1 cursor-pointer transition-all",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
};
