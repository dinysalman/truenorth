/**
 * Sample unit test to verify Jest setup
 * Tests basic functionality to ensure the testing infrastructure works
 */

describe('Jest Setup Verification', () => {
  it('should pass a basic assertion', () => {
    expect(true).toBe(true);
  });

  it('should perform arithmetic correctly', () => {
    expect(2 + 2).toBe(4);
  });

  it('should handle string operations', () => {
    const greeting = 'Hello, TrueNorth';
    expect(greeting).toContain('TrueNorth');
    expect(greeting.length).toBeGreaterThan(0);
  });

  it('should work with arrays', () => {
    const priorities = [1, 2, 3];
    expect(priorities).toHaveLength(3);
    expect(priorities).toContain(1);
  });

  it('should work with objects', () => {
    const step = {
      id: '1',
      title: 'Test step',
      priority: 1,
    };
    expect(step).toHaveProperty('id');
    expect(step.priority).toBe(1);
  });

  it('should handle async operations', async () => {
    const promise = Promise.resolve('success');
    await expect(promise).resolves.toBe('success');
  });
});

describe('Date Utilities', () => {
  it('should get current date', () => {
    const now = new Date();
    expect(now).toBeInstanceOf(Date);
    expect(now.getTime()).toBeGreaterThan(0);
  });

  it('should format ISO date strings', () => {
    const date = new Date('2026-02-19T08:00:00Z');
    const isoString = date.toISOString();
    expect(isoString).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });
});
