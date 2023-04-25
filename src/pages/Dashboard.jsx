import React, { StrictMode } from 'react'

//rrd imports 
import { Link, useLoaderData } from 'react-router-dom';

//library
import { toast } from 'react-toastify';

//components
import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';


//helper functions
import { addExpense, createBudget, deleteItem, fetchData, loadingSim } from '../helpers'

//loader   
export function dashboardLoader() {
    //fetch data from local storage, return as object  
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses")
    return { userName, budgets, expenses }
}


//actions
export async function dashboardAction({ request }) {
    await loadingSim()
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data)

    // FUTURE CHALLENGE
    // replace with reducer - hooks or redux??
    if (_action === 'newUser') {
        try {
            //attempt to store the username in localstorage
            localStorage.setItem("userName", JSON.stringify(values.userName))
            return toast.success(`Welcome, ${values.userName}`)
        } catch (error) {
            throw new Error("Error creating account.")
        }
    }

    if (_action === "createBudget") {
        try {
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount
            })
            return toast.success("Budget Created")
        } catch (error) {
            throw new Error("Error creating budget.")
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
}


const Dashboard = () => {

    //variable for the 
    const { userName, budgets, expenses } = useLoaderData()

    return (
        <>
            {userName ? (
                <div className='dashboard'>
                    <h1>Welcome back, <span className='accent'>{userName}</span></h1>
                    <div className="grid-sm">
                        {
                            budgets && budgets.length > length > 0 ?
                                (
                                    <div className="grid-lg">
                                        <div className="flex-lg">
                                            <AddBudgetForm />
                                            <AddExpenseForm budgets={budgets} />
                                        </div>
                                        <h2>Existing Budgets</h2>
                                        <div className="budgets">
                                            {
                                                budgets.map((budget) => (
                                                    <BudgetItem key={budget.id} budget={budget} />
                                                ))
                                            }
                                        </div>
                                        {
                                            expenses && expenses.length > 0 && (
                                                <div className="grid-md">
                                                    <h2>Recent Expenses</h2>
                                                    <Table 
                                                        expenses={expenses
                                                        // only display the five most recent 
                                                        // go to the end of the array and cut the last five out since the table sorts the array
                                                        .slice(Math.max(expenses.length - 5, 0))} />
                                                    {
                                                        expenses.length > 5 && (
                                                            <Link
                                                                to="expenses"
                                                                className="btn btn--dark"
                                                            >
                                                                Link to expenses
                                                            </Link>
                                                        )
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                ) :
                                (
                                    <div className="grid-sm">
                                        <p>Create a budget to get started</p>
                                        <AddBudgetForm />
                                    </div>
                                )
                        }
                    </div>
                </div>) : <Intro />}
        </>
    )
}

export default Dashboard;