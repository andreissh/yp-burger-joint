import "@testing-library/jest-dom";
import { vi } from "vitest";

beforeEach(() => {
  if (typeof localStorage !== "undefined") {
    localStorage.clear();
  }
});

global.fetch = vi.fn();
