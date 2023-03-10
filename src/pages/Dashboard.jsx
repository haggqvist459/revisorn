import React from 'react'

//rrd imports 
import { useLoaderData } from 'react-router-dom';

//library
import { toast } from 'react-toastify';

//components
import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';

//helper functions
import { createBudget, fetchData } from '../helpers'

//actions
export async function dashboardAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data)


    if (_action === 'newUser') {
        try {
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
}


//loader   
export function dashboardLoader() {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    return { userName, budgets }
}

export const Dashboard = () => {
    const { userName, budgets } = useLoaderData()

    return (
        <>
            {userName ? (
                <div className='dashboard'>
                    <h1>Welcome back, <span className='accent'>{userName}</span></h1>
                    <div className="grid-sm">
                        {/* {budgets ? () : ()} */}
                        <div className="grid-lg">
                            <div className="flex-lg">
                                <AddBudgetForm />
                            </div>
                        </div>
                    </div>
                </div>) : <Intro />}
        </>
    )
}
