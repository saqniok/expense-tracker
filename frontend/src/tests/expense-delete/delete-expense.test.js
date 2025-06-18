import { describe, it , expect, vi, beforeEach } from 'vitest';
import { deleteExpense } from '../../expenses-delete/delete-expense.js';


beforeEach(() => {
    global.fetch = vi.fn();
});

describe('delete Expenses', () => {
    it('successfully deletes an expense (status 204)', async () => {
        fetch.mockResolvedValue({
            ok: true,
            status: 204
        });

        const result = await deleteExpense('123');
        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/expenses/123', { method: 'DELETE' });
        expect(result).toBe(true);
    });

    it('fail to delete an expense (status 404)', async () => {
        fetch.mockResolvedValue({
            ok: false,
            status: 404
        });

        await expect(() => deleteExpense('123')).rejects.toThrow('Failed to delete expense: 404');
    })

    it('throws an error on network failure', async () => {
    fetch.mockRejectedValue(new Error('Network error'));

    await expect(() => deleteExpense('all')).rejects.toThrow('Network error');
    });
})