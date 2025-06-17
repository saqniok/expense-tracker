import { showExpenses } from './src/expenses-list/show-expenses.js'
import { __only_for_test } from './src/expenses-create/bind-form.js';

const form = document.querySelector('#expense-form');
const appElement = document.getElementById('app');

showExpenses(appElement);
__only_for_test.bindFormSubmit(form, appElement);