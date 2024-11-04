import React from "react";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface ButtonProps {
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  outline?: boolean;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  href,
  onClick,
  children,
  outline = false,
  disabled = false,
  loading = false,
  className = "",
}) => {
  const router = useRouter();

  const handlePress = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (href) {
      event.preventDefault();
      router.push(href);
    } else if (onClick) {
      onClick(event);
    }
  };

  const baseClassName =
    "rounded-xl px-5 py-2.5 transition-all duration-300 border  font-medium flex justify-center  items-center  focus:ring-2 focus:ring-opacity-50";

  const extraClassName = disabled
    ? "opacity-85"
    : outline
    ? "bg-transparent"
    : "hover:bg-transparent";

  return (
    <button
      className={`${baseClassName} ${extraClassName} ${className}`}
      onClick={handlePress}
      disabled={disabled}
    >
      {loading ? <FaSpinner className="animate-spin" size={22} /> : children}
    </button>
  );
};

export default Button;
