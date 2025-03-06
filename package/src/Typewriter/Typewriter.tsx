import React, { forwardRef } from 'react';
import { useProps } from '@mantine/core';

export interface TypewriterProps {
  /** Target element */
  children: React.ReactNode;

  /** Key of the prop that should be used to get element ref */
  refProp?: string;
}

const defaultProps: Partial<TypewriterProps> = {
  refProp: 'ref',
};

export const Typewriter = forwardRef<HTMLDivElement, TypewriterProps>((props, ref) => {
  const { children, refProp, ...others } = useProps('Typewriter', defaultProps, props);

  return (
    <div ref={ref} {...others}>
      <h2>Typewriter</h2>
    </div>
  );
});

Typewriter.displayName = 'Typewriter';
