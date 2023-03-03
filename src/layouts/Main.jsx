import React from 'react'
//rrd imports 
import { Outlet, useLoaderData } from 'react-router-dom';
//helper functions
import { fetchData } from '../helpers'

//assets 
import wave from '../assets/wave.svg'

//components
import Nav from '../components/Nav';

//loader   
export function mainLoader() {
    const userName = fetchData("userName");
    return { userName }
}

export const Main = () => {
    const { userName } = useLoaderData()

    return (
        <div className='layout'>
            <Nav userName={userName}/>
            <main>
                {/* recieves everything from children  array in createBrowserRouter  */}
                <Outlet />
            </main>
            <img src={wave} alt=""/>
        </div>
    )
}
