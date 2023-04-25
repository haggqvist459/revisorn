import React from 'react'
import ExpenseItem from './ExpenseItem'

const Table = ({ expenses, showBudget = true}) => {
    
    // sort by the most recent expenses
    const sortedExpenses = expenses.sort((a, b) => b.createdAt - a.createdAt)

    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {["Name", "Amount", "Date", showBudget ? "Budget" : "", ""].map((i, index) => (<th key={index}>{i}</th>))}
                    </tr>
                </thead>
                <tbody>{sortedExpenses.map((expense) => (
                    <tr key={expense.id}>
                        <ExpenseItem expense={expense} showBudget={showBudget}/>
                    </tr>
                ))}</tbody>
            </table>
        </div>
    )
}

export default Table