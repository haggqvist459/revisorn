//generate a random colour
const generateRandomColour = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}

//localstorage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}; 

//delete item 
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key); 
}

export const createBudget = ({name, amount}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        colour: generateRandomColour()
    }

    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem])); 
}
