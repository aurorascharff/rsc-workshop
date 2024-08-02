export function sum(a: number, b: number) {
  return a + b;
}

import { expect, test } from 'vitest';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
