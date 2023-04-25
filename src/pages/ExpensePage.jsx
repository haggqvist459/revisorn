import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import Table from '../components/Table'
import { deleteItem, fetchData } from '../helpers'


export function expenseLoader() {
  //fetch data from local storage, return as object  
  const expenses = fetchData("expenses")
  return { expenses }

}

export async function expenseAction({ request }) {

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
}

const ExpensePage = () => {

  const { expenses } = useLoaderData();

  return (
    <div className='grid-lg'>
      <h1>All Expenses</h1>
      {
        // add this check in case someone manually enters the URL for the expense page
        expenses && expenses.length > 0 ? 
        (
          <div className="grid-md">
            <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
            <Table expenses={expenses}/>
          </div>
        ) 
        :
        <p>No Expenses to show</p>

      }
    </div>
  )
}

export default ExpensePage;