import { removeExpense } from '../expenses-delete/remove-expense.js'
import { showExpenses } from './show-expenses.js'
import { showError } from '../ui-helpers.js'

async function onDeleteButtonClicked(element, expense) {
    const result = await removeExpense(expense.id);

    if(result.success) { await showExpenses(element); }
    else { showError(element, result.error); }
}

export function appendDeleteButton(parent, element, expense) {
    const button = document.createElement("button");
    button.classList.add('confirm-delete');

    const confirmLabel = document.createElement('span');
    confirmLabel.classList.add('confirm-label');
    confirmLabel.textContent = 'Delete';  // начальный текст

    button.appendChild(confirmLabel);
    parent.appendChild(button);

    let confirmState = false;

    button.addEventListener('click', async () => {
        if (!confirmState) {
            confirmLabel.textContent = 'Sure?';
            confirmState = true;
        } else {
            button.disabled = true;

            try {
                await onDeleteButtonClicked(element, expense);
            } catch (error) {
                button.disabled = false;
            }
        }
    });
}


export const __only_for_test = { onDeleteButtonClicked, appendDeleteButton };