import { describe, it, expect, beforeEach } from 'vitest';
import { showExpenses, showError, showEmptyState, renderExpenses } from '../../expenses-list/show-expenses.js';

describe('UI rendering functions', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
    });

    it('shows loading message', () => {
        showExpenses(container);
        expect(container.innerHTML).toContain('Loading...');
    });

    it('shows error message in red', () => {
        showError(container, 'Something went wrong');
        expect(container.innerHTML).toContain('Something went wrong');
        expect(container.innerHTML).toContain('color: red');
    });

    it('shows empty state message', () => {
        showEmptyState(container);
        expect(container.innerHTML).toContain('No Expenses Found');
    });

    it('renders expense list', () => {
        const expenses = [
            { description: 'whore', amount: 12, displayDate: '16/06/2025' },
            { description: 'bitch', amount: 30, displayDate: '15/06/2025' }
        ];
        renderExpenses(container, expenses);
        expect(container.querySelectorAll('li').length).toBe(2);
        expect(container.innerHTML).toContain('whore');
        expect(container.innerHTML).toContain('bitch');
    });

    it('renders empty state for empty array', () => {
        renderExpenses(container, []);
        expect(container.innerHTML).toContain('No Expenses Found');
    });
});
