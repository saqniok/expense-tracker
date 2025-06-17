# 💰 Expense Tracker

## 🎯 Doel

Connect the frontend to the backend. You pick up the expenses via the API and show them in the browser. You also add testable intermediate steps such as loading status and an empty condition.
From now on we assume that all changes in the 'Frontend' brochure must be made.

## API Fetch

1. - Create a file `fetch-expenses.js` in`/SRC/Expenses-List/`in which all API calls are defined.
2. - Make a test file `fetch-expenses.test.js` in`/tests/Expenses-list/`in which you test these API calls with a gemocked` fetch '.
3. - Implement and test the function `Gerexpensesdata ()` Calls that raw data from the API via `Get /Expenses'.
4. - Let Errors Seping Through to the Service Layer:

   * Gebruik `throw` als `response.ok` niet waar is.
   * Vermijd `try/catch` hier, foutafhandeling gebeurt hogerop.
5. - **Commit on Green**

## Data Service: verwerk API data

1. - Maak een bestand `format-expenses.js` aan in `/src/expenses-list/`.

2. - Create a test file `format-Expenses.test.js` in`/tests/expenses-list/`in which you test functions from` format-expenses.js'.

3. - Implementeer en test de functie `formatExpenses()`, die een array van `expense`-objecten als argument aanneemt en een array teruggeeft van dezelfde objecten, met één extra property: `displayDate`. Deze property is een geformatteerde versie van `date`, via `toLocaleDateString()`.
   Test this auxiliary function without making them public with an export such as:

   ```js
   export const __only_for_test = { FormatExpenses };
   ```

4. - Implement and test the function `Getexpenses ()`, which:

   *Call up raw data via `Getexpensesdata ()`
   *the result processed with `Formatexpenses ()`
   *returns a status object:

     *Successful:

       `` JS
       {Success: True, Expenses}
       `` `
     *In case of error:

       `` JS
       {Success: False, Error}
       `` `

   📌 **Testhints:**

   * - Mock `getExpensesData()` met `vi.mock(...)` zodat je gecontroleerd test wat `getExpenses()` doet bij succes/fout.
   * - Bij succes test je of `getExpenses()` correcte, geformatteerde data teruggeeft met `displayDate`.
   * - Bij fout test je of het error-object correct wordt doorgegeven in `{ success: false, error }`.

   **Voorbeeldmock (bovenaan testbestand):**
   ```js
   import { describe, it, expect, vi } from 'vitest';

   vi.mock('../../src/expenses-list/fetch-expenses', () => ({
      getExpensesData: vi.fn(),
   }));

   import { getExpenses, __only_for_test as internal } from '../../src/expenses-list/format-expenses';
   import { getExpensesData } from '../../src/expenses-list/fetch-expenses';
   ```

5. **Commit on Green**

## UI Rendering

1. - Create a file `show-expenses.js` in`/SRC/Expenses-List/`in which you implement UI functions that take a DOM element as an argument. All *show \ ... *functions replace the existing content of the specified element with the required new content.
2. - Maak een testbestand `show-expenses.test.js` aan in `/tests/expenses-list/` waarin je deze functies afzonderlijk test.
3.Implement and test the function `Show loading (element)`. This shows a section with the text "loading ...".
4. - Implement and test the function `Showerror (element, error)`. This shows a section with the error message and makes the text red.
5. - Implement and test the function `Showemptystate (element)`. This shows a section with the text "No Expenses Found.".
6. - Implement and test the function `renderexpenses (element, expenses)`. If the array is empty, show the empty state. Otherwise you show a list (<ul> `) with` <li> `elements in which each Expense is displayed as text.
7. - Maak de functies testbaar via een export zoals:

   ```js
   export const __only_for_test = { showLoading, showError, showEmptyState, renderExpenses };
   ```
8. Implement and test the function `Showexpenses (element)`.
   This function shows the correct onion based on the status of the expenditure service.

   * Roept eerst `showLoading(element)` aan zodat de gebruiker een visuele indicatie krijgt dat data geladen wordt.
   * Vraagt data op via `getExpenses()` uit de service-laag.
   * Bij een geslaagde response: roept `renderExpenses(element, result.expenses)` aan om de lijst te tonen.
   * Bij een fout: roept `showError(element, result.error)` aan om de foutmelding te tonen.
9. **Commit on Green**

## App Initialisatie

1. -Make a simple HTML file (`Index.html`) with an element such as:
   ```html
   <div id="app"></div>
   ```
2. In `app.js` importeer `showExpenses()` en roep deze functie aan met bovenstaande DOM element als argument.
3. Make sure this script is charged correctly via your HTML file.
4. VERIFIE that the initial expenses are shown in your browser.
5. **Commit on Green**

## Testplan

### API + Logic

* [X] `getExpensesData()` haalt correct data op via fetch
* [X] `formatExpenses()` voegt `displayDate` toe aan elk item
* [X] `getExpenses()` gebruikt `getExpensesData()` en `formatExpenses()` correct
* [X] Edge case: lege lijst => correct resultaat
* [X] Edge case: API-fout => foutobject wordt teruggegeven

### UI Rendering

* [X] `showLoading()` toont "Loading..."
* [X] `showError()` toont foutboodschap en maakt tekst rood
* [X] `showEmptyState()` toont "No expenses found."
* [X] `renderExpenses()` toont een lijst met items als de array niet leeg is
* [X] `renderExpenses()` roept `showEmptyState()` aan bij een lege lijst

### UI Integratie

* [X] `showExpenses()` toont laadstatus, resultaat of fout op basis van service response
* [X] `showExpenses()` toont correcte fallback bij lege lijst
* [X] `showExpenses()` toont foutboodschap bij fetch error
* [X] `showExpenses()` getest met gemockte `getExpenses()`

### Eindintegratie

* [X] Alles gelinkt in `app.js` en zichtbaar in browser
* [X] CI workflow draait alle tests succesvol

## Project structuur

```
/frontend
├── index.html
├── style.css
├── /src
│   └── /expenses-list
│       ├── fetch-expenses.js
│       ├── format-expenses.js
│       └── show-expenses.js
├── /tests
│   └── /expenses-list
│       ├── fetch-expenses.test.js
│       ├── format-expenses.test.js
│       └── show-expenses.test.js
├── package.json
└── vitest.config.j
```
