import { createExpense } from "./post-expense.js";

export function validateFormData(data) {
    // Check: the description must not be empty or contain only spaces
    if (!data.description || data.description.trim() === '') {
        return { success: false, error: 'Description is required.' };  
    }

    // Check: the amount is mandatory (must not be empty)
    if (!data.amount) {
        return { success: false, error: 'Amount is required.' };
    }

    const amount = parseFloat(data.amount); // Convert a string to a number (“10” -> 10)

    // Check: the sum must be a positive number and not NaN
    if(amount < 0 || isNaN(amount)) {
        return { success: false, error: 'Amount must be a positive number.' };
    }

    // Check: the date must not be empty or only made of spaces
    if (!data.date || data.date.trim() === '') {
        return { success: false, error: 'Date is required.' };
    }

    return { success: true }; // If all checks are passed - return success
}

export async function addExpense(data) {
    const validation = validateFormData(data); // First validate the form data
    if (!validation.success) { return validation }; // If validation is not successful, we return an error immediately

    try {
        await createExpense(data);  // If validation is successful, we create the expense
        return { success: true };   // If the request was successful - return the result with success: true
    } catch (error) {
            return { success: false, error: error.message }; // In case of an error during a network request - return an error message
        } 
}