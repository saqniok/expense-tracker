import { expect, it, describe, vi, beforeEach } from 'vitest';
import { getExpenses, getExpensesData } from '../../expenses-list/fetch-expenses.js';

global.fetch = vi.fn();


describe('getExpenses', () => {
    beforeEach(() => {
        fetch.mockReset();
    });

    it('testing getExpenses', async () => {
        const fakeExpense = [{ id: "1a2b3c", description: "Lunch bij Broodje Mario" }];
        fetch.mockResolvedValue({
            ok: true,
            json: () => fakeExpense

        });
        const result = await getExpenses();
        expect(result).toEqual(fakeExpense);
    });

    it('testing getExpense with error', async() => {
        fetch.mockResolvedValue({ ok: false });
        await expect(getExpenses()).rejects.toThrowError("Failed to fetch data")
    });
    
    it('testing getExpensesData', async () => {
        const fake = [{ description: "Lunch bij Broodje Mario" }];
        const returnedFake = [{ id: "1a2b3c", description: "Lunch bij Broodje Mario" }];
        fetch.mockResolvedValue({
            ok: true,
            json: () => returnedFake
        });

        const result = await getExpensesData(fake);

        expect(fetch).toHaveBeenCalledWith("http://localhost:3000/expenses", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fake),
        });
        expect(result).toEqual(returnedFake);
    })
});