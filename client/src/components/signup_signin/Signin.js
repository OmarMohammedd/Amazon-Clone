import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Logincontext } from '../context/Contextprovider';
import { BASE_URL } from "../../utils/config"



const Sign_in = () => {

    const { setAccount } = useContext(Logincontext);

    const [logdata, setData] = useState({
        email: "",
        password: ""
    });
    
    const adddata = (e) => {
        const { name, value } = e.target;
        setData((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    };

    const senddata = async (e) => {
        e.preventDefault();

        const { email, password } = logdata;
        // try {
            const res = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });

            const data = await res.json();
            console.log(data)

            if (res.status === 400 || !data) {
                toast.error("Invalid Details 👎!", {
                    position: "top-center",
                });
            } else {
                
                setAccount(data)
                toast.success("Login Successfully done 😃!", {
                    position: "top-center"
                });
                setData({...logdata,email:"", password:""})
                window.location.href = "/"; 
            }
        // } catch (error) {
        //     console.log("login page ka error" + error.message);
        // }
    };

    return (
        <section>
            <div className="sign_container">
                <div className="sign_header">
                    <img src="./blacklogoamazon.png" alt="signupimg" />
                </div>
                <div className="sign_form">
                    <form method="POST">
                        <h1>Sign-In</h1>
                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email"
                                onChange={adddata}
                                value={logdata.email}
                                id="email" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password"
                                onChange={adddata}
                                value={logdata.password}
                                id="password" placeholder="At least 6 characters" />
                        </div>
                        <button onClick={senddata} type="submit"
                         className="signin_btn">Continue</button>
                    </form>
                </div>
                <div className="create_accountinfo">
                    <p>New to Amazon?</p>
                    <NavLink to="/register">
                       <button className="create">Create your Amazon Account</button>
                    </NavLink>
                </div>
            </div>
            <ToastContainer
position="top-center"
autoClose={1800}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
        </section>
    )
}

export default Sign_in
