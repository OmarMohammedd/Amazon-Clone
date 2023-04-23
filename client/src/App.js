import './App.css';
import Navbaar from './components/header/Navbaar';
import Maincomp from './components/home/Maincomp';
import Newnav from './components/newnav/Newnav';
import Footer from './components/footer/Footer';
import Signup from './components/signup_signin/SignUp';
import Signin from './components/signup_signin/Signin';
import Cart from './components/cart/Cart';
import { Routes, Route} from "react-router-dom";
import Buynow from './components/buynow/Buynow';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';


function App() {

  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, [])



  return (
    <>
    {
      data ? (
        <>
       <Navbaar/>
       <Newnav/>
       <Routes>
          <Route path="/" element= {<Maincomp/>} ></Route>
          <Route path="/login" element= {<Signin/>} ></Route>
          <Route path="/register" element= {<Signup/>} ></Route>
          <Route path="/getproductsone/:id" element= {<Cart/>} ></Route>
          <Route path="/buynow" element= {<Buynow/>} ></Route>
       </Routes>
       <Footer/>
        </>
      ) : (
        <div className="circle">
        <CircularProgress />
        <h2> Loading....</h2>
        </div>
      )
    }


    </>
  );
}

export default App;

