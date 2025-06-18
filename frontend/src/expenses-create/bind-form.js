import { addExpense } from "../expenses-create/add-expense.js";
import { showExpenses } from "../expenses-list/show-expenses.js";
import { showError } from "../ui-helpers.js";

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

async function submitExpense(form){
    
    const formData = new FormData(form); // Create a FormData object for easy access to the values of form fields
    
    // Retrieve the required values from the form and form a data object
    const data = {
        description: formData.get('description'),
        amount: formData.get('amount'),
        date: formData.get('date')
    };

    const result = await addExpense(data); // Call the function for adding a flow rate (with validation and network request)
    return result; // Return the result (success or error)
}

// UI update function depending on the result of adding a flow rate
/**
 * @param {*} form This is the DOM element of the form that the user filled out and submitted
 * @param {*} element This is a container (usually <ul> or <div>) to display a list of expenses.
 * @param {*} result This is the result of executing the addExpense(data) function, which returns an object
 */
async function updateUI(form, element, result) {
    
    // If successful - reset the form and update the list of expenses
    if(result.success) { 
        form.reset(); 
        await showExpenses(element) // Re-render the expense list with the new data
    }
    else {
        showError(element, result.error); // If error — display an error message in the UI
    }
}

// Bind the form submission handler
/**
 * @param {*} form This is the DOM element of the form that the user filled out and submitted
 * @param {*} element This is a container (usually <ul> or <div>) to display a list of expenses.
 */
function bindFormSubmit(form, element){
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // preventDefault prevents the form from being submitted (which reloads the page)

        const result = await submitExpense(form);   // Send and validate form data
        await updateUI(form, element, result);      // Update the UI depending on success/failure
    });
}

export const __only_for_test = { submitExpense, updateUI, bindFormSubmit };