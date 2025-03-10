import { nanoid } from 'nanoid';

export interface ParallelTestContext {
  id: string;
  workerId: number;
  cleanup: () => Promise<void>;
}

export class ParallelTestManager {
  private static instance: ParallelTestManager;
  private activeTests: Map<string, ParallelTestContext>;

  private constructor() {
    this.activeTests = new Map();
  }

  static getInstance(): ParallelTestManager {
    if (!ParallelTestManager.instance) {
      ParallelTestManager.instance = new ParallelTestManager();
    }
    return ParallelTestManager.instance;
  }

  async createTestContext(workerId: number): Promise<ParallelTestContext> {
    const testId = `test-${nanoid()}-worker-${workerId}`;
    const context: ParallelTestContext = {
      id: testId,
      workerId,
      cleanup: async () => {
        await this.cleanupTest(testId);
      }
    };
    this.activeTests.set(testId, context);
    return context;
  }

  private async cleanupTest(testId: string): Promise<void> {
    // Add cleanup logic here (e.g., removing test data)
    this.activeTests.delete(testId);
  }

  getActiveTestCount(): number {
    return this.activeTests.size;
  }
}
