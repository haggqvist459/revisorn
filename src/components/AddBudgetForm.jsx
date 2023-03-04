import React from 'react'
//rrd imports
import { Form } from 'react-router-dom'

//library
import { CurrencyDollarIcon } from '@heroicons/react/24/solid'

const AddBudgetForm = () => {
  return (
    <div className='form-wrapper'>
        <h2 className='h3'>Create Budget</h2>
        <Form 
            method='post'
            className='grid-sm'
            >
                <div className="grid-sm">
                    <label htmlFor='newBudget'>New Budget</label>
                    <input type='text' name='newBudget' id='newBudget' placeholder='e.g., groceries' required></input>
                </div>
                <div className="grid-xs">
                    <label htmlFor='newBudgetAmount'></label>
                    <input type='number' step='0.01' name='newBudgetAmount' id='newBudgetAmount' placeholder='e.g., A$600' required inputMode='decimal'></input>
                </div>
                <input type='hidden' name='_action' value='createBudget'/> 
                <button type='submit' className='btn btn--dark'>
                    <span>Create Budget</span>
                    <CurrencyDollarIcon width={20 }/>
                </button>
            </Form>
    </div>
  )
}

export default AddBudgetForm