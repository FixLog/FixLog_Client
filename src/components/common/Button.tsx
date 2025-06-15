import React from 'react';

interface ButtonProps {
    text: string;
    fontSize?: string;
    width?: string;
    height?: string;
    bgColor?: string;
    textColor?: string;
    margin?: string;
    isDisabled?: boolean;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
    text,
    fontSize = 'text-[16px]',
    width = 'w-[90px]', 
    height = 'h-[54px]',
    bgColor = 'bg-sub1',
    textColor = 'text-gray-800',
    margin = '',
    isDisabled = false,
    onClick,
}) => {
  return (
    <button
        className={`font-semibold rounded-[8px] ${fontSize} ${width} ${height} ${bgColor} ${textColor} ${margin} ${isDisabled ? 'cursor-default' : 'cursor-pointer'}`}
        onClick={isDisabled ? undefined : onClick}
    >
        {text}
    </button>
  );
};

export default Button;
