import React from "react";

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  isLoading: boolean;
};

const Button = ({ onClick, children, isLoading }: ButtonProps) => {
  return (
    <React.Fragment>
      <button
        onClick={onClick}
        disabled={isLoading}
        className={`px-12 py-3 rounded-md ${
          isLoading ? "text-gray-500" : "bg-gray-800"
        } text-sm text-white md:hover:bg-gray-600 transition-all`}
      >
        {children}
      </button>
    </React.Fragment>
  );
};

export default Button;
