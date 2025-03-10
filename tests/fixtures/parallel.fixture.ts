import { test as base } from '@playwright/test';
import { ParallelTestManager } from '../utils/ParallelTestManager';

// Define the test fixture with parallel execution support
export const test = base.extend({
  // Add parallel context to each test
  parallelContext: async ({}, use, testInfo) => {
    const manager = ParallelTestManager.getInstance();
    const context = await manager.createTestContext(testInfo.workerIndex);
    await use(context);
    await context.cleanup();
  },

  // Add isolated storage for each test
  testStorage: async ({ parallelContext }, use) => {
    const storage = {
      id: parallelContext.id,
      data: new Map<string, any>(),
      clear: async () => {
        storage.data.clear();
      }
    };
    await use(storage);
  }
});

export { expect } from '@playwright/test';