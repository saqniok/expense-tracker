export function showExpenses(element) {
    element.innerHTML = `<section>Loading...</section>`
}

export function showError(element, error) {
    element.innerHTML = `<section style="color: red;">Error: ${error}</section>`
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
            <span>${expense.description}</span>
            <span>${expense.amount}</span>
            <span>${expense.displayDate}</span>
        </li>`).join('');

        element.innerHTML = `<ol>${items}</ol>`;
}

// ol - Ordered List
// ul - Unordered List
// li - inside of ol or ul