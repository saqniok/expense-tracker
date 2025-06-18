import { describe, it, expect, beforeEach } from 'vitest';
import { removeExpense } from '../../expenses-delete/remove-expense.js';
import { deleteExpense } from '../../expenses-delete/delete-expense.js';

vi.mock('../../expenses-delete/delete-expense.js', () => ({
    deleteExpense: vi.fn(),
}));

beforeEach(() => {
    vi.clearAllMocks();
});

describe('remove Expense', () => {
    it('Successfuly deleting expense', async () => {
        deleteExpense.mockResolvedValue({ success: true });

        const result = await removeExpense('123123');
        expect(result).toEqual({ success: true });
        expect(deleteExpense).toHaveBeenCalledWith('123123');
    });

    it('return success alse and error', async () => {
        deleteExpense.mockRejectedValue(new Error('Not found, go home'));

        const result = await removeExpense('123123');
        expect(result).toEqual({ success: false, error: 'Not found, go home' });
    });
});