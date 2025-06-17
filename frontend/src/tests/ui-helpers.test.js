import { describe, it, expect, vi } from 'vitest';
import { showError } from '../ui-helpers.js';

vi.mock('../../expenses-list/format-expenses.js');

describe('showError', () => {
    let container = document.createElement('div');

    it('shows error message in red', () => {
        showError(container, 'Something went wrong');
        expect(container.innerHTML).toContain('Something went wrong');
        expect(container.innerHTML).toContain('color: red');
    });

});