//simulate loading 
export const loadingSim = () => new Promise(res => setTimeout(res, Math.random() * 1000))

//generate a random colour
const generateRandomColour = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}

// fetch data from localstorage 
// pass in the key for the object stored in localStorage, e.g., budgets or expenses 
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export const getAllMatchingItems = ({category, key, value}) => {
    const data = fetchData(category) ?? [];

    return data.filter((item) => item[key] === value)
}

//delete an item or object from localStorage 
export const deleteItem = ({ key, id }) => {

    const existingData = fetchData(key);
    if (id){
        const newData = existingData.filter((item) => item.id !== id)
        return localStorage.setItem(key, JSON.stringify(newData))
    }
    return localStorage.removeItem(key);
}

//pass name and amount to create a budget object
export const createBudget = ({ name, amount }) => {
    //new object (budget)
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        colour: generateRandomColour()
    }

    //check if there are any existing budgets, if not, create empty array 
    const existingBudgets = fetchData("budgets") ?? [];
    //store the budget in localStorage
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]));
}

//add an expense to an existing budget
//need to pass in name, amount and id for the budget 
export const addExpense = ({ name, amount, budgetId }) => {

    //new object (expense added as budget)
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }

    //check for existing expenses, if not, create a new empty array for the expenses
    const existingExpenses = fetchData("expenses") ?? [];

    //store the expenses in localStorage
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]));

}


// total amount spent on each budget
export const calcSpentOnBudget = (budgetId) => {

    const expenses = fetchData("expenses") ?? [];
    const spentOnBudget = expenses.reduce((acc, expense) => {

        // check if the expense.budgetId matches the budgetId passed
        if(expense.budgetId !== budgetId) return acc

        // return the current amount to the total
        return acc += expense.amount

        // return 0 if mismatched budget
    }, 0)
    return spentOnBudget;

}




// formatting functions

// format currency 
export const formatCurrency = (amount) => {

    return amount.toLocaleString(undefined, {
        style: 'currency',
        currency: 'AUD'
    })
}

// format percentages
export const formatPercentage = (amount) => {
    return amount.toLocaleString(undefined, {
        style: 'percent',
        minimumFractionDigits: 0,
    })
}

// format date to localestring
export const formatDate = (epoch) => { 
   return new Date(epoch).toLocaleDateString() 
}
