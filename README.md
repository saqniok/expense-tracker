# 💰 Expense Tracker

## 🎯 Doel

Gebruikers kunnen nieuwe uitgaven toevoegen via een formulier. Na het toevoegen wordt de lijst automatisch herladen.

## API Create

1. Maak een nieuw bestand `post-expense.js` aan in `/src/expenses-create/` en implementeer daarin een functie `createExpense(data)` die een POST-verzoek stuurt naar `POST /expenses`.
2. `data` bevat minimaal: `description`, `amount`, `date`
3. Test deze functie in `post-expense.test.js` (in `/tests/expenses-create/`):
   * succesvolle POST (status 201)
   * fout bij POST (bv. 400 of netwerkfout)
4. De functie moet een fout gooien bij `!response.ok`, zonder `try/catch`.
5. **Commit on Green**

## Data Service: Create

1. Maak een nieuw bestand `add-expense.js` aan in `/src/expenses-create/`
2. Maak een nieuw bestand `add-expense.test.js` aan in `/tests/expenses-create/`
3. Implementeer en test de functie `validateFormData(data)`:
   * controleer op aanwezigheid van description, amount en date
   * parse amount naar een getal en controleer of het een positief getal is
   * geef bij fouten een object terug in de vorm { success: false, error } met een duidelijke foutmelding
   * bij geldige invoer geef je { success: true } terug
4. Implementeer en test de functie `addExpense(data)` die validatie uitvoert met `validateFormData(data)`
   * bij fout geeft deze `{ success: false, error }` terug zonder een API-call te doen
   * bij geldige input roept ze `createExpense(data)` aan en verwerkt eventuele fouten:
     * bij succes geeft ze `{ success: true }` terug
     * bij fout geeft ze `{ success: false, error }` terug
5. **Commit on Green**

## UI Rendering Voorbereiding
1. Maak een nieuw bestand `ui-helpers.js` aan in `/src/`
2. Maak een nieuw bestand `ui-helpers.test.js` aan in `/tests/`
3. Verplaats de functie `showError()` van `show-expenses.js` naar `ui-helpers.js`
4. Verplaats de relevante tests naar `ui-helpers.test.js`
5. Kijk de import statements na
6. **Commit on Green**

## UI Rendering
1. Maak een nieuw bestand `bind-form.js` aan in `/src/expenses-create/`
2. Maak een nieuw testbestand `bind-form.test.js` aan in `/tests/expenses-create/`
3. Implementeer en test de functie `submitExpense(form)`:
   * leest waarden uit het formulier via `FormData`
   * vormt een object `data`
   * roept `addExpense(data)` aan en geeft het resultaat terug
   * export via `__only_for_test`
4. Implementeer en test `updateUI(form, element, result)`:
   * controleert of `result.success` true is
   * als dat zo is:
     * reset het formulier met `form.reset()`
     * roept `showExpenses(element)` aan om de lijst opnieuw te laden
   * als het mislukt:
     * toont een foutmelding via `showError(element, result.error')` (bijv. UI feedback geven op basis van `result`)
   * export via `__only_for_test`
5. Implementeer en test de functie `bindFormSubmit(form, element)`:

   * registreert een submit-handler op het formulier
   * haalt de formdata op via `FormData`
   * roept `addExpense(data)` aan
   * bij succes: reset het formulier en toont de geüpdatete lijst via `showExpenses(element)` (import `show-expenses.js`)
   * bij fout: toont een foutmelding via `showError(element, message)` (import `ui-helpers.js`)
6. **Commit on Green**

## App Integratie
1. Voeg een formulier toe aan de HTML met velden: `description`, `amount`, `date`, `category`, `submit button`.
2. In `app.js` importeer `bindFormSubmit()` en roep deze functie aan met de juiste DOM elementen (bovenstaande form en div met `id="app"`).
3. Verifieër dat je een uitgave kan toevoegen en deze getoond word in de lijst.
4. **Commit on Green**

## Testplan

### API + Data Service
* [] `createExpense()` stuurt correcte POST, gooit fout bij failure
* [] `validateFormData()` valideert verplichte velden en positief bedrag
* [ ] `addExpense()` valideert input en verwerkt `createExpense()` resultaat correct

### UI Helpers
* [ ] `showError()` toont fout in DOM met juiste styling

### Form Binding & UI Rendering
* [ ] `submitExpense()` leest formulier correct uit en roept `addExpense()`
* [ ] `updateUI()` reset formulier en toont lijst bij success, toont foutmelding bij failure
* [ ] `bindFormSubmit()` registreert handler en verwerkt form flow correct (stretch: integration test)

### App Integratie
* [ ] HTML bevat correct formulier met alle velden
* [ ] `bindFormSubmit()` wordt aangeroepen in `app.js` met correcte elementen
* [ ] Volledige flow werkt: formulier invullen => submit => lijst geüpdatet
* [ ] CI draait en slaagt op alle tests

## Projectstructuur

```
/frontend
├── /src
│   ├─── /expenses-create
│   │   ├── post-expense.js
│   │   ├── add-expense.js
│   │   └── bind-form.js
│   └── ui-helpers.js
├── /tests
│   ├── /expenses-create
│   │   ├── post-expense.test.js
│   │   ├── add-expense.test.js
│   │   └── bind-form.test.js
│   └── ui-helpers.test.js
```
