import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

export class ReportManager implements Reporter {
  private static instance: ReportManager;
  private testResults: Map<string, TestResult>;

  private constructor() {
    this.testResults = new Map();
  }

  static getInstance(): ReportManager {
    if (!ReportManager.instance) {
      ReportManager.instance = new ReportManager();
    }
    return ReportManager.instance;
  }

  onTestBegin(test: TestCase): void {
    console.log(`Starting test: ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    this.testResults.set(test.title, result);
    console.log(`Test completed: ${test.title} with status: ${result.status}`);
  }

  getTestResult(testName: string): TestResult | undefined {
    return this.testResults.get(testName);
  }
}
