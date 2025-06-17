import { describe, it, expect, beforeEach, vi } from 'vitest';
import { showLoading, showError, showEmptyState, renderExpenses, showExpenses } from '../../expenses-list/show-expenses.js';
import { getExpenses } from '../../expenses-list/format-expenses.js';

vi.mock('../../expenses-list/format-expenses.js');

describe('UI rendering functions', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
    });

    it('shows loading message', () => {
        showLoading(container);
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

describe('showExpenses function', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        vi.clearAllMocks();
    });

    it('calls renderExpenses on successful fetch', async () => {
        const fakeExpenses = [
            { description: 'Lunch', amount: 10, displayDate: '16/06/2025' }
        ];

        getExpenses.mockResolvedValue({ success: true, expenses: fakeExpenses });

        await showExpenses(container);

        expect(container.innerHTML).toContain('Lunch');
    });

    it('calls showError on failed fetch', async () => {
        getExpenses.mockResolvedValue({ success: false, error: 'Server error' });

        await showExpenses(container);

        expect(container.innerHTML).toContain('Server error');
    });
    it('shows list on successful fetch', async () => {
        getExpenses.mockResolvedValue({
            success: true,
            expenses: [
                { description: 'Coffee', amount: 3, displayDate: '17/06/2025' },
            ]
        });

        await showExpenses(container);

        expect(container.innerHTML).toContain('Coffee');
        expect(container.innerHTML).toContain('17/06/2025');
    });

    it('shows fallback at empty list', async () => {
        getExpenses.mockResolvedValue({
            success: true,
            expenses: []
        });

        await showExpenses(container);

        expect(container.innerHTML).toContain('No Expenses Found');
    });

    it('shows error message in case of error', async () => {
        getExpenses.mockResolvedValue({
            success: false,
            error: 'Server down'
        });

        await showExpenses(container);

        expect(container.innerHTML).toContain('Server down');
        expect(container.innerHTML).toContain('color: red');
    });
});

