import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

//libraries
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//routes
import Dashboard, { dashboardAction, dashboardLoader } from './pages/Dashboard';
import { Main, mainLoader } from './layouts/Main';
import ExpensePage, { expenseLoader, expenseAction } from './pages/ExpensePage';
import BudgetPage, { budgetAction, budgetLoader } from './pages/BudgetPage';
import { Error } from './pages/Error';

//actions 
import { logoutAction } from './actions/logout';
import { deleteBudget } from './actions/delete';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    loader: mainLoader,
    errorElement: <Error/>,
    //all children gets placed in <Outlet/>
    children: [ 
      {
        index: true,
        element: <Dashboard/>,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error/>
      },
      {
        path: "expenses",
        element: <ExpensePage/>,
        loader: expenseLoader,
        action: expenseAction,
        errorElement: <Error/>
      },
      {
        path: "budget/:id",
        element: <BudgetPage/>,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error/>,
        children: [
          {
            path: "delete",
            action: deleteBudget
          }
        ]
      },
      {
        path: "logout",
        action: logoutAction
      },
    ]
  },

  //make sure this is at the bottom if used 
  // {
  //   path: "*",
  //   errorElement: <Error/>
  // },
]);


function App() {
  return <div className="App"> 
    <RouterProvider router={router} />
    <ToastContainer/>
  </div>;
}

export default App;