// __mocks__/zustand.ts
import { useState } from "react";

const zustand = jest.createMockFromModule("zustand");

export const create = (fn: any) => {
  const state = fn((set: any) => ({ ...set }));
  const useStore = () => useState(state)[0];
  useStore.setState = jest.fn();
  return useStore;
};

export default zustand;
