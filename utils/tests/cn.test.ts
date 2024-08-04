import { expect, test } from 'vitest';
import { cn } from '../cn';

const isTrue = true;

test('merges different classnames correctly', () => {
  expect(cn('flex', 'flex-col')).toBe('flex flex-col');
  expect(cn('text-red', 'flex')).toBe('text-red flex');
  expect(cn('px-2 py-1 bg-red hover:bg-dark-red', 'p-3 bg-[#B91C1C]')).toBe('hover:bg-dark-red p-3 bg-[#B91C1C]');
  expect(cn('px-2 py-1 bg-red hover:bg-dark-red', 'p-3 bg-[#B91C1C]')).toBe('hover:bg-dark-red p-3 bg-[#B91C1C]');
  expect(cn(isTrue ? 'flex' : 'hidden', 'flex-col')).toBe('flex flex-col');
});
