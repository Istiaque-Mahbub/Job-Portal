import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SignIn/SignIn";
import JobDetails from "../pages/JobDetails/JobDetails";
import PrivateRouter from "./PrivateRouter";
import JobApply from "../pages/JobApply/JobApply";
import MyApplication from "../pages/MyApplication/MyApplication";
import AddJob from "../pages/AddJob/AddJob";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement:<h2>Route not found</h2>,
      children:[
        {
            path:'/',
            element:<Home></Home>,
        },
        {
          path:'/jobs/:id',
          element:<PrivateRouter>
            <JobDetails></JobDetails>
          </PrivateRouter>,
          loader:({params})=>fetch(`http://localhost:5000/jobs/${params.id}`)
        },
        {
          path:'/jobApply/:id',
          element:<PrivateRouter><JobApply></JobApply></PrivateRouter>,    
        },
        {
          path:'/myApplication',
          element:<PrivateRouter><MyApplication></MyApplication></PrivateRouter>
        },
        {
          path:'/addJob',
          element:<PrivateRouter><AddJob></AddJob></PrivateRouter>
        },
        {
            path:'/register',
            element:<Register></Register>
        },
        {
            path:'signIn',
            element:<SignIn></SignIn>
        },
      ]
    },
  ]);

  export default router;
