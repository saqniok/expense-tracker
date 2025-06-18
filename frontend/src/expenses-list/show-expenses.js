import { getExpenses } from '../expenses-list/format-expenses.js'
import { showError } from '../ui-helpers.js'

export function showLoading(element) {
    element.innerHTML = `<section>Loading...</section>`
}

export function showEmptyState(element) {
    element.innerHTML = `<section>No Expenses Found</section>`
}

function calculateTotal(expenses) {
    return expenses.reduce((sum, expense) => {
        const amount = parseFloat(expense.amount);
        return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
}

export function renderExpenses(element, expenses) {
    if(!Array.isArray(expenses) || expenses.length === 0) {
        showEmptyState(element);
        const totalEl = document.getElementById('total-amount');
        if (totalEl) totalEl.textContent = '0€';
        return;
    }

    const items = expenses.map(expense =>
        `<div class="expense-row">
            <span>${expense.description}</span>
            <span>${expense.amount}€</span>
            <span>${expense.displayDate}</span>
            <span>${expense.category}</span>
        </div>`
    );

    element.innerHTML = `${items.join('')}`;

    const total = calculateTotal(expenses);
    const totalEl = document.getElementById('total-amount');
    if(totalEl) {
        totalEl.textContent = `${total.toFixed(2)}€`;
    }
}


export async function showExpenses(element) {
    showLoading(element);

    const result = await getExpenses();

    if(result.success) { renderExpenses(element, result.expenses); }
    else { showError(element, result.error)}
}