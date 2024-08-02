/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { beforeEach, afterEach } from 'vitest';

beforeEach(() => {
  // Mock things
});

afterEach(() => {
  cleanup();
});
