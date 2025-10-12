import { lazy, Suspense } from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

//layouts
const MainLayout = lazy(()=>import('../layouts/mainLayout/MainLayout'));

//Components 
import { PageSuspenseFallback,LottieHandler  } from '@components/feedback';

//pages
const Home = lazy(()=>import('../pages/Home')) ;
const Categories = lazy(()=>import('../pages/Categories')) ;
const AboutUs = lazy(()=>import('../pages/AboutUs')) ;
const Register = lazy(()=>import('../pages/Register')) ;
const Login = lazy(()=>import('../pages/Login')) ;
const Products = lazy(()=>import('../pages/Products')) ;
const Cart = lazy(()=>import('../pages/Cart')) ;
const Wishlist = lazy(()=>import('../pages/Wishlist')) ;
const Profile = lazy(()=>import('../pages/Profile')) ;
import Error from '@pages/Error';

//protect routes
import ProtectedRoute from '@components/Auth/ProtectedRoute';

const router = createBrowserRouter([
    {
        path:"/",
        element:<Suspense fallback={<div style={{marginTop:"10%"}}>
            <LottieHandler type="loading" message="loading please wait...." /> </div>} >
                    <MainLayout/>
              </Suspense>,
        errorElement:<Error/>,
        children:[
            {
                index:true,
                element:<PageSuspenseFallback ><Home/></PageSuspenseFallback>,
            },
            {
                path:"cart",
                element:<PageSuspenseFallback ><Cart/></PageSuspenseFallback>
            },
            {
                path:"wishlist",
                element:<PageSuspenseFallback ><Wishlist/></PageSuspenseFallback>
            },
            {
                path:"categories",
                element:<PageSuspenseFallback ><Categories/></PageSuspenseFallback>,
            },
            {
                path:"categories/products/:prefix",
                element:<PageSuspenseFallback ><Products/></PageSuspenseFallback>,
                loader:({params})=>{
                    if(typeof params.prefix !=="string" || !/^[a-z]+$/i.test(params.prefix))
                    {
                        throw new Response("Bad Request",{
                            statusText:"category not found",
                            status:400,
                        })
                    }

                    return true;
                }
            },
            {
                path:"about-us",
                element:<PageSuspenseFallback><AboutUs/></PageSuspenseFallback>,
            },
            {
                path:"login",
                element:<PageSuspenseFallback><Login/></PageSuspenseFallback>,
            },
            {
                path:"register",
                element:<PageSuspenseFallback><Register/> </PageSuspenseFallback>,
            },
            {
                path:"profile",
                element:<PageSuspenseFallback>
                            <ProtectedRoute>
                                <Profile/> 
                            </ProtectedRoute>
                        </PageSuspenseFallback>,
            },
            

        ]

    }
])
const AppRouter = () => {
  return (
       <RouterProvider router={router} />
  )
}

export default AppRouter
