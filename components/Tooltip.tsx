import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  text: string | undefined;
  children: React.ReactNode;
}

const portalRoot = document.getElementById('tooltip-portal');

const TooltipContent: React.FC<{ text: string; parentRect: DOMRect | null }> = ({ text, parentRect }) => {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<React.CSSProperties>({
        position: 'fixed',
        opacity: 0,
        pointerEvents: 'none',
        transition: 'opacity 0.3s ease-in-out',
        zIndex: 100,
        top: '-9999px',
        left: '-9999px',
    });
    
    useEffect(() => {
        if (parentRect && tooltipRef.current) {
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const top = parentRect.top - tooltipRect.height - 8;
            const left = parentRect.left + (parentRect.width / 2);
            
            setStyle({
                position: 'fixed',
                opacity: 1,
                pointerEvents: 'none',
                transition: 'opacity 0.3s ease-in-out',
                zIndex: 100,
                top: `${top}px`,
                left: `${left}px`,
                transform: `translateX(-50%) translateZ(0)`,
            });
        }
    }, [parentRect]);

    if (!portalRoot || !parentRect) return null;

    return createPortal(
        <div
            ref={tooltipRef}
            style={style}
            className="w-64 p-3 text-sm text-gray-200 bg-gray-900/95 backdrop-blur-sm border border-yellow-400/50 rounded-lg shadow-xl"
            role="tooltip"
        >
            {text}
            <div 
                className="absolute top-full left-1/2 -translate-x-1/2 mt-[-1px] w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-yellow-400/50"
            />
        </div>,
        portalRoot
    );
};

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [parentRect, setParentRect] = useState<DOMRect | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  if (!text) {
    return <>{children}</>;
  }
  
  return (
    <>
      <div 
        ref={triggerRef} 
        onMouseEnter={() => triggerRef.current && setParentRect(triggerRef.current.getBoundingClientRect())} 
        onMouseLeave={() => setParentRect(null)}
        className="flex w-full"
      >
        {children}
      </div>
      {parentRect && <TooltipContent text={text} parentRect={parentRect} />}
    </>
  );
};