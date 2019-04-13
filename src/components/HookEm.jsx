import React, { useMemo } from 'react';
import { Example, Name, Counter } from "./Hooks.jsx";
import { MultipleRed } from "./MultipleRed.jsx";

export const Collecter = () => {
  const child1 = useMemo(() => <Example />, [Example]);
  const child2 = useMemo(() => <Name />, [Name]);
  const child3 = useMemo(() => <Counter />, [Counter]);
  const child5 = useMemo(() => <MultipleRed />, [MultipleRed]);

  return (
    <>
      {child1}
      {child2}
      {child3}
      {child5}
    </>
  )
}