import React from 'react';

export const HomebrewIcon: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, ...props }) => (
  <i className={`fa-solid fa-receipt ${className || ''}`} {...props}></i>
);