import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createExpense } from '../../expenses-create/post-expense.js';

beforeEach(() => {
  global.fetch = vi.fn();
});

describe('createExpense', () => {
  it('Success with 201 and return expense', async () => {
    const fakeExpense = { description: 'Lunch', amount: 15, date: '2025-06-17' };
    const fakeResponse = { id: 1, ...fakeExpense };

    fetch.mockResolvedValue({
      ok: true,
      status: 201,
      json: () => Promise.resolve(fakeResponse),
    });

    const result = await createExpense(fakeExpense);

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fakeExpense),
    });

    expect(result).toEqual(fakeResponse);
  });

  it('error POST with code 400', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 400,
    });

    const fakeExpense = { description: 'Invalid', amount: -1, date: '2025-06-17' };

    await expect(createExpense(fakeExpense)).rejects.toThrow('Failed to create expense: 400');
  });

  it('should throw an error on network failure', async () => {
    fetch.mockRejectedValue(new Error('Network error'));

    const fakeExpense = { description: 'Taxi', amount: 20, date: '2025-06-17' };

    await expect(createExpense(fakeExpense)).rejects.toThrow('Network error');
  });
});
