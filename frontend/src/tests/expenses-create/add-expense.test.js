import { describe, expect, it, vi, beforeEach } from 'vitest';
import { validateFormData, addExpense } from '../../expenses-create/add-expense.js';

// vi.mock('../../expenses-create/add-expense.js');

describe('validateFormData', () => {
    
    it('fails when description is missing', () => {
        const result = validateFormData({ amount: '10', date: '2025-06-17' });
        
        expect(result).toEqual({ success: false, error: 'Description is required.' });
    });

    it('fails when amount is missing or negative', () => {
        const result = validateFormData({ description: 'Test', date: '2025-06-17'});
        const result1 = validateFormData({ description: 'Test', amount: 'b', date: '2025-06-17'});
        const result2 = validateFormData({ description: 'Test', amount: '-1', date: '2025-06-17'})
        
        expect(result).toEqual({ success: false, error: 'Amount is required.'});
        expect(result1, result2).toEqual({ success: false, error: 'Amount must be a positive number.'});  
    });

    it('fails when date is missig', () => {
        const result = validateFormData({ description: 'Test', amount: '10'});
        
        expect(result).toEqual({ success: false, error: 'Date is required.'});
    });

    it("Chech if expense have description, amount and date", () => {
        const result = validateFormData({ description: 'Test', amount: '10', date: '2025-06-17'});
    
        expect(result).toEqual({ success: true });
    });
});

vi.mock('../../expenses-create/post-expense.js');

describe('addExpense', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('', async () => {
        const result = await addExpense({ amount: '', description: '', date: '' });
        expect(result).toEqual({ success: false, error: 'Description is required.' });
        // first checks data.description, then amount, then date
    });

        it('', async () => {

        const data = { description: 'Test', amount: '10', date: '2025-06-17' };
        const result = await addExpense(data);

        expect(result).toEqual({ success: true });
    });
});