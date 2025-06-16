import { expect, it, describe, vi, beforeEach } from 'vitest';

vi.mock('../../expenses-list/fetch-expenses.js', () => ({
  getExpensesData: vi.fn(),
}));

import { getExpensesData } from '../../expenses-list/fetch-expenses.js';
import { __only_for_test, getExpenses } from "../../expenses-list/format-expenses.js";

global.fetch = vi.fn();

describe('get Expenses', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return formatted expenses with displayDate property', async () => {
    const fakeExpenses = [
      { id: '1', amount: 10.99, description: 'Netflix subscription', date: new Date('2025-06-01') },
      { id: '2', amount: 49.99, description: '1 hour with hooker', date: new Date('2025-06-01') }
    ];

    // Мокаем getExpensesData чтобы возвращать сырые данные (или форматированные, смотря как у тебя устроена функция)
    getExpensesData.mockResolvedValue(fakeExpenses);

    // Тестируем вызов getExpensesData
    const result = await getExpensesData();
    expect(getExpensesData).toHaveBeenCalled();

    // В результате должен быть массив с объектами, у которых есть поле date (в исходных данных)
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('date');

    const formattedResult = __only_for_test.formatExpenses(result);
    expect(formattedResult[0]).toHaveProperty('displayDate');
  });
  
  it('should return error object on failure', async () => {
    getExpensesData.mockRejectedValue(new Error('Network failure'));

    const result = await getExpenses();

    expect(getExpensesData).toHaveBeenCalled();
    expect(result.success).toBe(false);
    expect(result.error).toBe('Network failure');
  });
})