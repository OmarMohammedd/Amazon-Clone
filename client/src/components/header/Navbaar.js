import "./navbaar.css";
import { NavLink, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { Logincontext } from "../context/Contextprovider";
import { useContext, useEffect, useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Rightheader from "./Rightheader";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LoginIcon from '@mui/icons-material/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from "react-redux";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { BASE_URL } from "../../utils/config"



const Navbaar = () => {
  
  const { account, setAccount } = useContext(Logincontext);


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const getdetailsvaliduser = async () => {
    const res = await fetch(`${BASE_URL}/validuser`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    if (res.status !== 201) {
      console.log("first login");
    } else {
      console.log("data valid");
      setAccount(data);
    }
  };

  useEffect(() => {
    getdetailsvaliduser();
  }, );


                        // for logout
  // @ts-ignore
  const history = useNavigate("");

    const logoutuser = async () => {
        const res2 = await fetch(`${BASE_URL}/logout`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });


        // @ts-ignore
        if (!res2.status === 201) {
            // @ts-ignore
            const error = new Error(res2.error);
            throw error;
        } else {
            toast.success("user Logout 😃!", {
                position: "top-center"
            });
            history("/");
            setAccount(false);
        }
    }

               // Drawer (open)
const [dropen, setDropen] = useState(false);

    const handelopen = () => {
      setDropen(true);
     }

  const handleClosedr = () => {
      setDropen(false)
  }

  const [text, setText] = useState();
  const [liopen, setLiopen] = useState(true);

  const getText = (text) => {
      setText(text)
      setLiopen(false)
  }


                 // only for search
// @ts-ignore
const { products } = useSelector(state => state.getproductsdata);

  return (
    <header>
      <nav>
        <div className="left">

          <IconButton className="hamburgur" onClick={handelopen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
          {/* here define the right header */}
          <Drawer open={dropen} onClose={handleClosedr}>
            <Rightheader logclose={handleClosedr} logoutuser={logoutuser}/>
          </Drawer>

          <div className="navlogo">
            <NavLink to="/">
              <img src="./amazon_PNG25.png" alt="logo" />
            </NavLink>
          </div>
          <div className="nav_searchbaar">

            <input type="text"
               onChange={(e)=>getText(e.target.value)}
               placeholder="Search Your Products"
             />
            <div className="search_icon">
              <SearchIcon />
            </div>
 
               {/* search filter  */}
  {
    text &&
      <List className="extrasearch" hidden={liopen}>
          {
          // @ts-ignore
          products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
              <ListItem>
                  <NavLink to={`${BASE_URL}/getproductsone/${product.id}`} onClick={() => setLiopen(true)}>
                      {product.title.longTitle}
                  </NavLink>
              </ListItem>
              ))
          }
      </List>
    }

          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
             <NavLink to="/login">signin</NavLink>
          </div>
          <div className="cart_btn">
            {account ? (
              <NavLink to="/buynow">
                <Badge badgeContent={account.carts.length} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            )}

             <ToastContainer /> 

            <p>Cart</p>
          </div>
          {account ? (
            <Avatar className="avtar2"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >{account.fname[0].toUpperCase()}</Avatar>
          ) : (
            <Avatar className="avtar"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            ></Avatar>
          )}
          
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
    <MenuItem onClick={handleClose}>My account</MenuItem>
      {
        // @ts-ignore
        // eslint-disable-next-line react/jsx-no-duplicate-props
        account ? <MenuItem onClick={handleClose} onClick={logoutuser}>
          <LoginIcon style={{ fontSize: 16, marginRight: 3 }}/>Logout</MenuItem>:""
      }

      </Menu>
        </div>
        {/* <ToastContainer /> */}
      </nav>
    </header>
  );
};

export default Navbaar;
