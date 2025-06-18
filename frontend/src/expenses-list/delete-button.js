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
    //confirmLabel.textContent = 'X';  // initial text of the button

    button.appendChild(confirmLabel);   // Add the caption inside the button
    parent.appendChild(button);         // Insert the button in the parent DOM element (for example, in <li>)

    let confirmState = false; // Logical variable: whether the button requires confirmation

    // Assign a button click handler. It will be called every time the user clicks on the delete button.
    // The handler will check whether the button requires confirmation or not and if it does - will show a confirmation dialog
    button.addEventListener('click', async () => {
    if (!confirmState) { // Check whether the confirmation mode (second click) is active now. If not, it means that this is the first click, and we need to ask the user for confirmation
        
        button.dataset.confirm = "true";    // visual trigger for CSS (changes text from X to Delete?)
        confirmState = true;                // logical state in JS to realize that the user has already started the deletion process.

        // Blur event handler - called when the button loses focus (for example, the user pressed Tab or clicked sideways).
        const onBlur = () => {
            button.dataset.confirm = "false";           // Reset visual state: remove the data-confirm=“true” attribute so that CSS shows a normal button (with X)
            confirmState = false;                       // Reset logical state in JS - confirmation is no longer active
            button.removeEventListener('blur', onBlur); // Delete the blur handler after triggering so that we don't have several identical ones.
        };
        // Assign a blur handler to the button to track the loss of focus
        button.addEventListener('blur', onBlur);

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