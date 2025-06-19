import { showExpenses } from './src/expenses-list/show-expenses.js'
import { bindFormSubmit } from './src/expenses-create/bind-form.js';

const form = document.querySelector('#expense-form');
const appElement = document.getElementById('app');

showExpenses(appElement);
bindFormSubmit(form, appElement);