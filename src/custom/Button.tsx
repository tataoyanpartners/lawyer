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
    default: "bg-[#6A49A2] rounded-1 cursor-pointer",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
};
