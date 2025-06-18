import { getExpenses } from '../expenses-list/format-expenses.js';
import { showError } from '../ui-helpers.js';
import { appendDeleteButton } from './delete-button.js';

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
/**
 *  RU Логика:
 * - Используется метод массива reduce, который аккумулирует сумму.
 * - Для каждого объекта expense пытаемся преобразовать поле amount в число через parseFloat.
 * - Если результат преобразования — не число (isNaN), считаем, что сумма для этого элемента 0.
 * - Иначе добавляем число к общей сумме.
 * - Начальное значение аккумулятора sum — 0.
 * 
 *  EN Logic:
 * - We use the reduce array method, which accumulates the amount.
 * - For each expense object, we try to convert the amount field to a number via parseFloat.
 * - If the result of the conversion is not a number (isNaN), we consider that the amount for this item is 0.
 * - Otherwise we add a number to the total amount.
 * - The initial value of the sum accumulator is 0.
 */


// renderExpenses takes an array of expenses and renders them in the given DOM `element`
export function renderExpenses(element, expenses) {
    // If Array is empty or null, show empty state and return
    if (!Array.isArray(expenses) || expenses.length === 0) {
        showEmptyState(element);
        
        // Check if `total-amount` element exists, update its text content to `0€`
        const totalEl = document.getElementById('total-amount');
        if (totalEl) totalEl.textContent = '0€';
        return;
    }

    element.innerHTML = ''; // clear the element befor rendering

    // Render each `expense` in the list `expenses`
    for (const expense of expenses) {
        const row = document.createElement('li');   // create a new element list <li>, witch will be a row
        row.classList.add('expense-row');           // add class to the row, for css style

        const description = document.createElement('span'); // *** create a new element <span> 
        description.textContent = expense.description;      // set text content to the description of the expense

        const amount = document.createElement('span');  // ***
        amount.textContent = `${expense.amount}€`;      // set text content to the amount of the expense

        const date = document.createElement('span');    // ***
        date.textContent = expense.displayDate;         // set text content to the date of the expense

        const category = document.createElement('span');    // ***
        category.textContent = expense.category || '';      // set text content to the category of the expense

        // Add all the created <span> with data inside the <li> row.
        row.appendChild(description);
        row.appendChild(amount);
        row.appendChild(date);
        row.appendChild(category);

        // Add a delete button to this line by calling a function from another module
        // The button will know which item and expense it belongs to
        appendDeleteButton(row, element, expense);

        // Insert the fully formed string into the parent element of the list of expenses
        element.appendChild(row);
    }

    const total = calculateTotal(expenses);                     // Call the calculateTotal function, which returns the sum of all expenses from the expenses array
    const totalEl = document.getElementById('total-amount');    // looking for an element with id “total-amount” in the DOM, where we will output the total amount
    
    // If such an element is found (to avoid an error if it is not in the DOM)
    if (totalEl) { totalEl.textContent = `${total.toFixed(2)}€`; }
    /**
     * Write a string with the total sum to the text content of the element
     * total.toFixed(2) - rounds the number to 2 decimal places for neat display
     * add the euro sign "€" at the end
     */
}


export async function showExpenses(element) {
    showLoading(element); // First show the loading indicator so that the user can see that the data is being loaded

    const result = await getExpenses(); // Wait for the result of the getExpenses function - it returns an object with data or an error

    // If the data was successfully received (flag success === true)
    if(result.success) { renderExpenses(element, result.expenses); }    // Rendering the obtained list of expenses in the element
    else { showError(element, result.error)}    // If an error occurred, show it to the user with showError
}