import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import {privateRouters, publicRouters} from './routes/index'

import { Fragment } from "react";
import DefaultLayout from "./Layout/DefaultLayout/DefaultLayout";

import { useSelector } from "react-redux";

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);
}

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
}


function App() {
  const user= useSelector(state=>state.user?.currentUser?.isAdmin);
  return (
    <BrowserRouter>
        <Routes>
        {user?(publicRouters.map((route, index) => {
                const Page = route.component;
                let Layout = DefaultLayout

                if (route.layout) {
                  Layout = route.layout
                }else if(route.layout===null){
                  Layout = Fragment
                }
              return <Route key={index} path={route.path} element={<Layout><Page/></Layout>} />
            }))
            :(<Route path="/" element={<Login/>} />)} 

            {user?(privateRouters.map((route, index) => {
              return <Route key={index} path={route.path} element={<Home/>} />
            }))
            :(privateRouters.map((route, index) => {
                const Page = route.component;
                let Layout = DefaultLayout

                if (route.layout) {
                  Layout = route.layout
                }else if(route.layout===null){
                  Layout = Fragment
                }
              return <Route key={index} path={route.path} element={<Layout><Page/></Layout>} />
            }))}
        </Routes>
  </BrowserRouter>
  );
}

export default App;
