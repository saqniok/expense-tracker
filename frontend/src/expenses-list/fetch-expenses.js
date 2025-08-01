export async function getExpensesData() {
    const respons = await fetch('http://localhost:5139/api/expenses');

    // Check that the response is successful
    if(!respons.ok) { throw new Error('Failed to fetch data') } // If the status is error, throw an exception with the message
    return respons.json(); // Parsing and returning JSON data from the response body
}