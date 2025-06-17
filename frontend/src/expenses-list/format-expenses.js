import { getExpensesData } from "./fetch-expenses.js";

 function formatExpenses(array) {
    console.log(array);
    return array.map((expenses) => ({
        ...expenses, // copy all properties from the original object
        displayDate: new Date (expenses.date).toLocaleDateString() // add new property as `displayDate` 
    }));
}

export async function getExpenses() {
    try {
        const expensesData = await getExpensesData();
        const expenses = formatExpenses(expensesData);

        return { success: true, expenses };
    } catch (error) {
        console.log(error.stack);
        return { success: false, error: error.message };
    }
}

export const __only_for_test = { formatExpenses };