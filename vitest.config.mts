import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  test: {
    coverage: {
      reportsDirectory: 'vitest-report',
    },
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/*'],
    globals: true,
    setupFiles: './setupTests.ts',
  },
});
