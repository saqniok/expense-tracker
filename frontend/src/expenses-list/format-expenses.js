import { getExpensesData } from "./fetch-expenses.js";

function formatExpenses(array) {
    return array.map((expenses) => ({
        ...expenses, // copy all properties from the original object
        displayDate: expenses.date.toLocaleDateString() // add new property as `displayDate` 
    }));
}

export async function getExpenses() {
    try {
        const expenses = await getExpensesData();
        const formatExpenses = formatExpenses(expenses);

        return { success: true, formatExpenses };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// export only for test
export const __only_for_test = { formatExpenses };