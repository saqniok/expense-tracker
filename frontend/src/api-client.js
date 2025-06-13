export async function getExpenses() {
    const respons = await fetch('http://localhost:3000/expenses');
    if(!respons.ok) { throw new Error('Failed to fetch data') }
    return respons.json();
}

export async function getExpensesData(data) {
    const response = await fetch('http://localhost:3000/expenses', {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if(!response.ok) { throw new Error('Failed to fetch data') };
    return await response.json();
}