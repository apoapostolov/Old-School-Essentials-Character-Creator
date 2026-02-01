import React from 'react';

export const DiceIcon: React.FC<{ className?: string }> = ({ className, ...props }) => {
    // Determine Font Awesome size class based on Tailwind height class
    let faSizeClass = 'fa-lg'; // default
    if (className?.includes('h-6')) {
        faSizeClass = 'fa-xl';
    } else if (className?.includes('h-5')) {
        faSizeClass = 'fa-lg';
    }

    // Filter out Tailwind h- and w- classes as they don't apply to <i> font icons.
    // Pass through other classes like `mr-2`.
    const filteredClassName = className
        ? className.split(' ').filter(c => !c.startsWith('h-') && !c.startsWith('w-')).join(' ')
        : '';

    return (
      <i className={`fa-solid fa-dice-d20 ${faSizeClass} ${filteredClassName}`} {...props} aria-hidden="true" />
    );
};
