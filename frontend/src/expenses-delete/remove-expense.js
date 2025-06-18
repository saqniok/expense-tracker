import { deleteExpense } from './delete-expense.js'

/**
 * Wraps the call of Deleteexpense to safely delete ID consumption with error processing.
 *
 * @param {string|number} id - A unique identifier for deleting an expanse
 */

export async function removeExpense(id) {
    try {
        await deleteExpense(id);    // Trying to delete expense via API
        return { success: true };   //  If successful - return success
    } catch (error) {
        // In error - return object with `success: false` and `error.message`
        return { success: false, error: error.message };
    }
}
