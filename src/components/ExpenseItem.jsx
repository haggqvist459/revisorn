import { TrashIcon } from '@heroicons/react/24/solid';
import React from 'react'
import { Link, useFetcher } from 'react-router-dom';
import { formatCurrency, formatDate, getAllMatchingItems } from '../helpers'

const ExpenseItem = ({ expense, showBudget }) => {

    const fetcher = useFetcher();

    const { name, amount, createdAt, budgetId } = expense

    const budget = getAllMatchingItems({
        category: 'budgets',
        key: 'id',
        value: budgetId,
    })[0];

    return (
        <>
            <td>{name}</td>
            <td>{formatCurrency(amount)}</td>
            <td>{formatDate(createdAt)}</td>
            {showBudget && (
                <td>
                    <Link
                        to={`/budget/${budget.id}`}
                        style={{
                            "--accent": budget.colour,
                        }}
                    >
                        {budget.name}
                    </Link>
                </td>
            )}
            <td>
                <fetcher.Form method='post'>
                    <input type="hidden" name='_action' value="deleteExpense" />
                    <button
                        name="expenseId"
                        value={expense.id}
                        className="btn btn--warning"
                        type="submit"
                    >
                        <TrashIcon width={20} />
                    </button>
                </fetcher.Form>
            </td>
        </>
    )
}

export default ExpenseItem
