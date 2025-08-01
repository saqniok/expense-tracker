export async function createExpense(data) {

    // Send a POST request to the local server at /expenses
    const response = await fetch('http://localhost:5139/api/expenses', {
        method: 'POST',                                     // POST - HTTP method - creating a new resource
        headers: { 'Content-Type': 'application/json' },    // Specify that we are sending JSON
        body: JSON.stringify(data),                         // Convert data object to JSON string
    });

    // If the server returned an error (400 or 500) - throw an exception
    if(!response.ok) { throw new Error(`Failed to create expense: ${response.status}`) }
    
    return response.json(); // Return the result as JSON
}