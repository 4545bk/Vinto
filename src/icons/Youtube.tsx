// src/icons/Youtube.tsx
import React from 'react';
import { IconProps } from "../utils/types";

const Youtube: React.FC<IconProps> = ({ size = 24, className = "" }) => {
    const svgSize = `${size}px`;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width={svgSize}
            height={svgSize}
            className={className}
        >
            <path d="M21.8 8.001a2.75 2.75 0 0 0-1.933-1.946C18.258 6 12 6 12 6s-6.258 0-7.867.055a2.75 2.75 0 0 0-1.933 1.946A28.34 28.34 0 0 0 2 12c0 1.34.097 2.665.2 3.999a2.75 2.75 0 0 0 1.933 1.946C5.742 18 12 18 12 18s6.258 0 7.867-.055a2.75 2.75 0 0 0 1.933-1.946A28.346 28.346 0 0 0 22 12a28.346 28.346 0 0 0-.2-3.999zm-9.8 7V9l5 3-5 3z" />
        </svg>
    );
};

export default Youtube;
