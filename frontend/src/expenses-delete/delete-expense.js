export async function deleteExpense(id) {
    const response = await fetch(`http://localhost:/expenses/${id}`, {
        method: 'DELETE'
    });

    if(!response.ok) { throw new Error(`Failed to delete expense: ${response.status}`) }
    
    return true;
}