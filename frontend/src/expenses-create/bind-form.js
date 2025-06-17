import { addExpense } from "../expenses-create/add-expense.js";
import { showExpenses } from "../expenses-list/show-expenses.js";
import { showError } from "../ui-helpers.js";

async function submitExpense(form){
    const formData = new FormData(form);
    const data = {
        description: formData.get('description'),
        amount: formData.get('amount'),
        date: formData.get('date')
    };

    const result = await addExpense(data);
    return result;
}

/**
 *  FormData in JS
 * 
 *  <form id="expenseForm">
 *      <input name="description" value="Lunch">
 *      <input name="amount" value="15">
 *  </form>
 * 
 *  const form = document.getElementById('expenseForm');
 *  const data = new FormData(form);
 *
 *  console.log(data.get('description')); // "Lunch"
 *  console.log(data.get('amount'));      // "15"
 */


async function updateUI(form, element, result) {
    if(result.success) { 
        form.reset(); 
        await showExpenses(element)
    }
    else {
        showError(element, result.error);
    }
}

function bindFormSubmit(form, element){
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const result = await submitExpense(form);
        await updateUI(form, element, result);
    });
}

export const __only_for_test = { submitExpense, updateUI, bindFormSubmit };