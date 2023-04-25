import { BanknotesIcon, TrashIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Form, Link } from 'react-router-dom'
import { calcSpentOnBudget, formatCurrency, formatPercentage } from '../helpers'

const BudgetItem = ({ budget, showDelete = false }) => {

    //deconstruct the budget obect to avoid having to write budget.id etc
    const { id, name, amount, colour } = budget

    //get the total value spent on the budget, by passing the id of the budget
    const spentOnBudget = calcSpentOnBudget(id)

    return (
        <div
            className="budget"
            style={{
                '--accent': colour
            }}
        >
            <div className="progress-text">
                <h3>{name}</h3>
                <p>{formatCurrency(amount)} Budgeted</p>
            </div>
            <progress max={amount} value={spentOnBudget}>{formatPercentage(spentOnBudget / amount)}</progress>
            <div className="progress-text">
                <small>{formatCurrency(spentOnBudget)} spent</small>
                <small>{formatCurrency(amount - spentOnBudget)} remaining</small>
            </div>
            {showDelete ? (
                <div className="flex-sm">
                    <Form
                        method='post'
                        action='delete'
                        onSubmit={(event) => {
                            if(!confirm("Are you sure you want to delete this budget?")){
                                event.preventDefault()
                            }
                        }}
                    >
                        <button type='submit' className='btn'>
                            <span>Delete Budget</span>
                            <TrashIcon width={20}/>
                        </button>
                    </Form>
                </div>
            ) :
                (
                    <div className="flex-sm">
                        <Link to={`/budget/${id}`} className="btn">
                            <span>View Details</span>
                            <BanknotesIcon width={20} />
                        </Link>
                    </div>
                )
            }
        </div>
    )
}

export default BudgetItem
