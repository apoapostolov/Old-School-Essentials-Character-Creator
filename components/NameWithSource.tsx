import React from 'react';
import type { SourceID } from '../types';

interface NameWithSourceProps {
  name: string;
  sourceId?: SourceID;
}

export const NameWithSource: React.FC<NameWithSourceProps> = ({ name, sourceId }) => {
  if (sourceId && sourceId !== 'ose') {
    const pillText = sourceId.replace(/-/g, ' ').toUpperCase();
    return (
      <>
        {name}
        <sup className="ml-1 -top-[0.4em] relative text-[0.6rem]" title={`Source: ${pillText}`}>
            <span className="font-bold bg-blue-900/80 text-blue-300 px-1 py-0.5 rounded-full border border-blue-700/50">
                {pillText}
            </span>
        </sup>
      </>
    );
  }
  return <>{name}</>;
};