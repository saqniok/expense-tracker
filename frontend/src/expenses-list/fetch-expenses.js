export async function getExpensesData() {
    const respons = await fetch('http://localhost:3000/expenses');
    if(!respons.ok) { throw new Error('Failed to fetch data') }
    return respons.json();
}