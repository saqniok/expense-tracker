import { getExpenses } from '../expenses-list/format-expenses.js'
import { showError } from '../ui-helpers.js'

export function showLoading(element) {
    element.innerHTML = `<section>Loading...</section>`
}

export function showEmptyState(element) {
    element.innerHTML = `<section>No Expenses Found</section>`
}

export function renderExpenses(element, expenses) {
    if(!Array.isArray(expenses) || expenses.length === 0) {
        showEmptyState(element);
        return;
    }

    const items = expenses.map(expense =>
        `<li>
            <span>${expense.description}...</span>
            <span>Price: ${expense.amount}€ </span>
            <span> Date: ${expense.displayDate}</span>
        </li>`);

        element.innerHTML = `<ul>${items.join('')}</ul>`;
}

export async function showExpenses(element) {
    showLoading(element);

    const result = await getExpenses();

    if(result.success) { renderExpenses(element, result.expenses); }
    else { showError(element, result.error)}
}