import { getExpensesData } from "./fetch-expenses.js";

// This function takes an array of expenses and returns a new array with the same expenses + a new property
function formatExpenses(array) {
    
    // RU - Метод map создаёт новый массив, преобразуя каждый элемент исходного массива
    // EN - The map method creates a new array by transforming each element of the original array

    return array.map((expenses) => ({
        ...expenses,  // create a copy of all fields of the source object (spread operator)
        displayDate: new Date(expenses.date).toLocaleDateString() // Add a new field displayDate, converting the date from the `date` property into a localized date format string
    }));
}

// Async function that gets and returns an array of expenses from a database or other source
export async function getExpenses() {
    try {
        const expensesData = await getExpensesData(); // Expect to receive “raw” cost data from some source
        const expenses = formatExpenses(expensesData); // format the received data, adding the `displayDate` field

        return { success: true, expenses }; // return an object indicating success and the expenses array
    } 
    catch (error) {
        return { success: false, error: error.message }; // return an object indicating failure and the error message
    }
}

export const __only_for_test = { formatExpenses };