import { createExpense } from "./post-expense.js";

export function validateFormData(data) {
    if (!data.description || data.description.trim() === '') {
        return { success: false, error: 'Description is required.' };  
    }

    if (!data.amount) {
        return { success: false, error: 'Amount is required.' };
    }

    const amount = parseFloat(data.amount); // to make string "10" in to number 10
    if(amount < 0 || isNaN(amount)) {
        return { success: false, error: 'Amount must be a positive number.' };
    }

    if (!data.date || data.date.trim() === '') {
        return { success: false, error: 'Date is required.' };
    }

    return { success: true };
}

export async function addExpense(data) {
    const validation = validateFormData(data);
    if (!validation.success) { return validation };

    try {
        await createExpense(data);
        return { success: true };
    } catch (error) {
            return { success: false, error: error.message };
        }
}