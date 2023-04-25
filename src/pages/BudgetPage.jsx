import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import AddExpenseForm from '../components/AddExpenseForm'
import BudgetItem from '../components/BudgetItem'
import Table from '../components/Table'
import { getAllMatchingItems, deleteItem, addExpense } from '../helpers'

//loader
export async function budgetLoader({ params }) {
    const budget = await getAllMatchingItems({
        category: "budgets",
        key: 'id',
        value: params.id
    })[0]

    const expenses = await getAllMatchingItems({
        category: "expenses",
        key: 'budgetId',
        value: params.id
    })

    if (!budget) {
        throw new Error("The budget you're trying to find doesn't exist")
    }
    return { budget, expenses }
}

export async function budgetAction({ request }) {

    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data)

    if (_action === "deleteExpense") {
        try {
            //create an expense for the selected budget
            deleteItem({
                key: "expenses",
                id: values.expenseId
            })
            console.log('expense: ', values.newExpense)
            return toast.success("Expense Deleted!")
        } catch (error) {
            throw new Error("Error deleting expense.")
        }
    }
    if (_action === "createExpense") {
        try {
            //create an expense for the selected budget
            addExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget
            })
            return toast.success(`Expense ${values.newExpense} added`)
        } catch (error) {
            throw new Error("Error adding expense.")
        }
    }

}

const BudgetPage = () => {

    const { budget, expenses } = useLoaderData();

    return (
        <div
            className="grid-lg"
            style={{
                "--accent": budget.colour
            }}>
            <h1 className="h2">
                <span className="accent">{budget.name}</span>
                {" "}Overview
            </h1>
            <div className="flex-lg">
                <BudgetItem budget={budget} showDelete={true} />
                <AddExpenseForm budgets={[budget]} />
            </div>
            {expenses && expenses.length > 0 && (
                <div className="grid-md">
                    <h2><span className="accent">{budget.name}</span> Expenses</h2>
                    <Table expenses={expenses} showBudget={false} />
                </div>
            )
            }
        </div>
    )
}

export default BudgetPage
