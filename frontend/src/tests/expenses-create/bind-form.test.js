import {describe, it, expect, beforeEach, vi } from 'vitest';
import { addExpense } from "../../expenses-create/add-expense.js"
import { __only_for_test } from '../../expenses-create/bind-form.js';

vi.mock('../../expenses-create/add-expense.js');

describe('submitExpense', () => {
    let form;

    beforeEach(() => {
        form = document.createElement('form');

        const description = document.createElement('input');
        description.name = 'description';
        description.value = 'Test description';

        const amount = document.createElement('input');
        amount.name = 'amount';
        amount.value = '42';

        const date = document.createElement('input');
        date.name = 'date';
        date.value = '2025-06-17';

        form.append(description, amount, date);
    });

    it('should call addExpense with correct data', async () => {
        addExpense.mockResolvedValue({ success: true });

        const result = await __only_for_test.submitExpense(form);

        expect(addExpense).toHaveBeenCalledWith({
            description: 'Test description',
            amount: '42',
            date: '2025-06-17'
        });

        expect(result).toEqual({ success: true });
    });

    it('should return error if addExpense fails', async () => {
        addExpense.mockResolvedValue({
            success: false,
            error: 'Invalid data'
        });

        const result = await __only_for_test.submitExpense(form);

        expect(result).toEqual({ success: false, error: 'Invalid data' });
    });
});