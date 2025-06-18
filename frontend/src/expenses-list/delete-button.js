import { removeExpense } from '../expenses-delete/remove-expense.js'
import { showExpenses } from './show-expenses.js'
import { showError } from '../ui-helpers.js'

async function onDeleteButtonClicked(element, expense) {
    const result = await removeExpense(expense.id); // Trying to delete an expense by its id

    if(result.success) { await showExpenses(element); } // If the deletion was successful - update the interface
    else { showError(element, result.error); } // Otherwise - show the error message in the interface
}

/**
 * Adds a delete button to the DOM element with an action confirmation
 *
 * @param {HTMLElement} parent  - The DOM element to which the button will be added (usually the expense string)
 * @param {HTMLElement} element - DOM element containing the entire list of expenses (used for UI updates)
 * @param {Object} expense      - An expense object containing at least the `id` field required for deletion
 */
export function appendDeleteButton(parent, element, expense) {
    const button = document.createElement("button");    // Create a new button element
    button.classList.add('confirm-delete');             // Add CSS class for styling

    // Create a caption on the button
    const confirmLabel = document.createElement('span');
    confirmLabel.classList.add('confirm-label');
    confirmLabel.textContent = 'X';  // initial text of the button

    button.appendChild(confirmLabel);   // Add the caption inside the button
    parent.appendChild(button);         // Insert the button in the parent DOM element (for example, in <li>)

    let confirmState = false; // Logical variable: whether the button requires confirmation

    button.addEventListener('click', async () => {
        if (!confirmState) {
            // First click - change the text to “Sure?” and wait for confirmation.
            confirmLabel.textContent = 'Delete?';
            confirmState = true;

            // Добавляем слушатель "blur" — если пользователь ушёл с кнопки, сбросить состояние
            const onBlur = () => {
                confirmLabel.textContent = 'X';
                confirmState = false;
                button.removeEventListener('blur', onBlur); // Убираем слушатель после срабатывания
            };
            button.addEventListener('blur', onBlur);
        } else {
            // Second click - confirmation received, lock the button
            button.disabled = true;

            try {
                await onDeleteButtonClicked(element, expense); // Trying to delete the expense via onDeleteButtonClicked
            } catch (error) {
                button.disabled = false; // If an error occurred - unlock the button so that we can try again
            }
        }
    });
}


export const __only_for_test = { onDeleteButtonClicked, appendDeleteButton };