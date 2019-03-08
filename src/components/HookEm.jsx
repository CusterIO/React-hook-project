import React, { useMemo } from 'react';
import { Example, Name } from "./Hooks.jsx";

export const Collecter = () => {
  const child1 = useMemo(() => <Example />, [Example]);
  const child2 = useMemo(() => <Name />, [Name]);

  return (
    <>
      {child1}
      {child2}
    </>
  )
}