import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

//libraries
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//routes
import { Dashboard, dashboardAction, dashboardLoader } from './pages/Dashboard';
import { Main, mainLoader } from './layouts/Main';
import { Error } from './pages/Error';

//actions 
import { logoutAction } from './actions/logout';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    loader: mainLoader,
    errorElement: <Error/>,
    //all children gets placed in <Outlet/>
    children: [ 
      {
        path: "/",
        element: <Dashboard/>,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error/>
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