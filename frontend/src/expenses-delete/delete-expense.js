/**
 * Sends a request to delete an expense by its ID.
 *
 * @param {string|number} id - Unique identifier of the expense to delete.
 * @returns {Promise<boolean>} - Returns `true` if the deletion was successful.
 */
export async function deleteExpense(id) {
    // Make a DELETE request to the server to delete the expense with the given ID
    const response = await fetch(`http://localhost:3000/expenses/${id}`, {
        method: 'DELETE'
    });

    // If the server returned an unsuccessful status (e.g. 404 or 500) - throw an error
    if(!response.ok) { throw new Error(`Failed to delete expense: ${response.status}`) }
    
    return true; // // Если всё прошло успешно — возвращаем true
}